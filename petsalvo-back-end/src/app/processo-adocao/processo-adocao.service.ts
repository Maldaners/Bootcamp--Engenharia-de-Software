import { Inject, forwardRef } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CustomHttpException } from "src/utils/exceptions/custom-http-exception.exception";
import { In, Not, Repository } from "typeorm";
import { AdotanteService } from "../adotante/adotante.service";
import { NotificacaoService } from "../notificacao/notificacao.service";
import { ConsultaOngDTO } from "../ong/dto/consulta-ong.dto";
import { OngService } from "../ong/ong.service";
import { PetService } from "../pet/pet.service";
import { ConsultaProcessoAdocaoAdotanteDTO } from "./dto/consulta-processo-adocao-adotante.dto";
import { ConsultaProcessoAdocaoOngDTO } from "./dto/consulta-processo-adocao-ong.dto";
import { ConsultaProcessoAdocaoDTO } from "./dto/consulta-processo-adocao.dto";
import { ProcessoAdocaoDTO } from "./dto/processo-adocao.dto";
import { ProcessoAdocaoEntity } from "./entities/processo-adocao.entity";
import { TipoStatusProcessoAdocao } from "./enums/tipo-status-processo-adocao.enum";
import { NAO_PERMITIDA_EXCLUSAO_TIPO_STATUS_PROCESSO_DE_ADOCAO_EM_ANALISE_OU_COM_PERFIL_ACEITO, NAO_PERMITIDO_CRIACAO_DE_MAIS_UM_PROCESSO_ADOCAO_COM_OS_MESMOS_IDS, NAO_PERMITIDO_EDICAO_PARA_ADOTADO_EM_PROCESSO_ADOCAO_COM_MESMO_PET, NENHUM_PROCESSO_ADOCAO_CADASTRADO, NENHUM_PROCESSO_ADOCAO_ENCONTRADO_COM_PARAMETROS_INFORMADOS, ONG_OU_PET_NAO_ENCONTRADOS_COM_OS_IDS_INFORMADOS, PROCESSO_ADOCAO_NAO_ENCONTRADO_COM_OS_IDS_INFORMADOS, TIPO_STATUS_PROCESSO_DE_ADOCAO_DEVE_SER_POR_DESISTENCIA_DA_ONG, TIPO_STATUS_PROCESSO_DE_ADOCAO_DEVE_SER_POR_DESISTENCIA_DO_ADOTANTE_OU_PERFIL_REJEITADO, TIPO_STATUS_PROCESSO_DE_ADOCAO_INVALIDO, TIPO_STATUS_PROCESSO_DE_ADOCAO_NAO_PERMITIDO } from "./responses/processo-adocao.responses";
import { FiltroProcessoAdocaoDTO } from "./dto/filtro-processo-adocao.dto";

export class ProcessoAdocaoService {

    constructor(
        @InjectRepository(ProcessoAdocaoEntity) private model: Repository<ProcessoAdocaoEntity>,
        @Inject(forwardRef(() => AdotanteService)) private readonly adotanteService: AdotanteService,
        @Inject(forwardRef(() => OngService)) private readonly ongService: OngService,
        @Inject(forwardRef(() => PetService)) private readonly petService: PetService,
        @Inject(forwardRef(() => NotificacaoService)) private readonly notificacaoService: NotificacaoService,
    ) { }

    //ADOTANTE
    public async criarParaAdotante(idUsuario: number, idOng: number, idPet: number): Promise<boolean> {
        const adotanteDto = await this.adotanteService.consultarPorId(idUsuario);
        await this.validarOngEPetExistentes(idOng, idPet);
        const status = TipoStatusProcessoAdocao.EM_ANALISE;

        if (await this.retornarProcessoAdocaoParaAdotante(adotanteDto.idAdotante, idOng, idPet))
            throw new CustomHttpException(NAO_PERMITIDO_CRIACAO_DE_MAIS_UM_PROCESSO_ADOCAO_COM_OS_MESMOS_IDS)

        const processoAdocaoEntity = await this.model.save({ idAdotante: adotanteDto.idAdotante, idOng: idOng, idPet: idPet, status: status });
        await this.notificacaoService.criarParaOng(idOng, processoAdocaoEntity.idProcessoAdocao, status);

        return true;
    }

    private async validarOngEPetExistentes(idOng: number, idPet: number) {
        try {
            await this.ongService.consultarPorIdOng(idOng);
            await this.petService.consultarPorIdOng(idOng, idPet);
        } catch (error) {
            throw new CustomHttpException(ONG_OU_PET_NAO_ENCONTRADOS_COM_OS_IDS_INFORMADOS);
        }
    }

    public async consultarPorIdsParaAdotante(idUsuario: number, idOng: number, idPet: number): Promise<ConsultaProcessoAdocaoAdotanteDTO> {
        const adotanteDto = await this.adotanteService.consultarPorId(idUsuario);
        const processoAdocaoDto = await this.retornarProcessoAdocaoParaAdotante(adotanteDto.idAdotante, idOng, idPet);

        if (!processoAdocaoDto)
            throw new CustomHttpException(PROCESSO_ADOCAO_NAO_ENCONTRADO_COM_OS_IDS_INFORMADOS);

        return processoAdocaoDto;
    }

    public async consultarTodosParaAdotante(idUsuario: number): Promise<ConsultaProcessoAdocaoAdotanteDTO[]> {
        const adotanteDto = await this.adotanteService.consultarPorId(idUsuario);

        const listaProcessoAdocaoEntity = await this.model.find({
            where: { idAdotante: adotanteDto.idAdotante },
            relations: { ong: { usuario: { imagem: true } }, pet: { imagens: true } },
            order: { pet: { imagens: { idImagem: "ASC" } } }
        });

        if (listaProcessoAdocaoEntity.length == 0)
            throw new CustomHttpException(NENHUM_PROCESSO_ADOCAO_CADASTRADO);

        return listaProcessoAdocaoEntity;
    }

    private async consultarPorIdParaAdotante(idProcessoAdocao: number, idAdotante: number): Promise<ConsultaProcessoAdocaoAdotanteDTO> {
        const processoAdocaoEntity = await this.model.findOne({
            where: { idProcessoAdocao: idProcessoAdocao, idAdotante: idAdotante },
            relations: { ong: true }
        });

        if (!processoAdocaoEntity)
            throw new CustomHttpException(PROCESSO_ADOCAO_NAO_ENCONTRADO_COM_OS_IDS_INFORMADOS);

        return processoAdocaoEntity;
    }

    public async editarParaAdotanteStatusDesistencia(idUsuario: number, idProcessoAdocao: number): Promise<boolean> {
        const adotanteDto = await this.adotanteService.consultarPorId(idUsuario);
        const processoAdocaoDto = await this.consultarPorIdParaAdotante(idProcessoAdocao, adotanteDto.idAdotante);
        const status = TipoStatusProcessoAdocao.DESISTENCIA_ADOTANTE;

        await this.model.update({ idProcessoAdocao: idProcessoAdocao, idAdotante: adotanteDto.idAdotante }, { status: status });
        await this.notificacaoService.criarParaOng(processoAdocaoDto.idOng, idProcessoAdocao, status);

        return true;
    }

    public async deletarParaAdotante(idUsuario: number, idProcessoAdocao: number): Promise<boolean> {
        const adotanteDto = await this.adotanteService.consultarPorId(idUsuario);
        const processoAdocaoDto = await this.consultarPorIdParaAdotante(idProcessoAdocao, adotanteDto.idAdotante);

        if (processoAdocaoDto.status != TipoStatusProcessoAdocao.DESISTENCIA_ADOTANTE && processoAdocaoDto.status != TipoStatusProcessoAdocao.PERFIL_REJEITADO)
            throw new CustomHttpException(TIPO_STATUS_PROCESSO_DE_ADOCAO_DEVE_SER_POR_DESISTENCIA_DO_ADOTANTE_OU_PERFIL_REJEITADO);

        await this.notificacaoService.editarProcessoAdocaoParaNull(idProcessoAdocao);
        await this.model.delete({ idProcessoAdocao: idProcessoAdocao, idAdotante: adotanteDto.idAdotante });

        return true;
    }

    public async deletarTodosParaAdotante(idUsuario: number): Promise<boolean> {
        const adotanteDto = await this.adotanteService.consultarPorId(idUsuario);

        const listaProcessoAdocaoEntity = await this.model.find({ where: { idOng: adotanteDto.idAdotante } });
        await this.validarListaProcessoAdocaoParaExclusao(listaProcessoAdocaoEntity);
        await this.notificacaoService.deletarTodasSeExistente(idUsuario);

        await this.model.delete({ idAdotante: adotanteDto.idAdotante });

        return true;
    }

    private async retornarProcessoAdocaoParaAdotante(idAdotante: number, idOng: number, idPet: number): Promise<ConsultaProcessoAdocaoAdotanteDTO> {
        return await this.model.findOne({
            where: { idAdotante: idAdotante, idOng: idOng, idPet: idPet },
            relations: { ong: { usuario: { imagem: true } }, pet: { imagens: true } },
            order: { pet: { imagens: { idImagem: "ASC" } } }
        });
    }
    //

    //ONG
    public async consultarPorIdsParaOng(idUsuario: number, idAdotante: number, idPet: number): Promise<ConsultaProcessoAdocaoOngDTO> {
        const ongDto = await this.ongService.consultarPorId(idUsuario);
        const processoAdocaoDto = await this.retornarProcessoAdocaoParaOng(ongDto.idOng, idAdotante, idPet);

        if (!processoAdocaoDto)
            throw new CustomHttpException(PROCESSO_ADOCAO_NAO_ENCONTRADO_COM_OS_IDS_INFORMADOS);

        return processoAdocaoDto;
    }

    private async retornarParametrosFiltroStatus(idOng: number, idPet: number, filtroDto: FiltroProcessoAdocaoDTO) {
        if (filtroDto == null || filtroDto.status == null || filtroDto.status.length == 0)
            return { idOng, idPet };
        else
            return { idOng, idPet, status: In(filtroDto.status) };
    }

    public async consultarTodosParaOngEPet(idUsuario: number, idPet: number, filtroDto: FiltroProcessoAdocaoDTO): Promise<ConsultaProcessoAdocaoOngDTO[]> {
        const ongDto = await this.ongService.consultarPorId(idUsuario);
        const petDto = await this.petService.consultarPorId(idUsuario, idPet);
        await this.validarListaTipoStatusProcessoAdocao(filtroDto.status);

        const listaProcessoAdocaoEntity = await this.model.find({
            where: await this.retornarParametrosFiltroStatus(ongDto.idOng, petDto.idPet, filtroDto),
            relations: { adotante: { usuario: { imagem: true } }, pet: { imagens: true } },
            order: { pet: { imagens: { idImagem: "ASC" } } }
        });

        if (listaProcessoAdocaoEntity.length == 0)
            throw new CustomHttpException(NENHUM_PROCESSO_ADOCAO_ENCONTRADO_COM_PARAMETROS_INFORMADOS);

        return listaProcessoAdocaoEntity;
    }

    public async consultarTodosParaOng(idUsuario: number): Promise<ConsultaProcessoAdocaoOngDTO[]> {
        const ongDto = await this.ongService.consultarPorId(idUsuario);

        const listaProcessoAdocaoEntity = await this.model.find({
            where: { idOng: ongDto.idOng },
            relations: { adotante: { usuario: { imagem: true } }, pet: { imagens: true } },
            order: { pet: { imagens: { idImagem: "ASC" } } }
        });

        if (listaProcessoAdocaoEntity.length == 0)
            throw new CustomHttpException(NENHUM_PROCESSO_ADOCAO_CADASTRADO);

        return listaProcessoAdocaoEntity;
    }

    private async validarListaTipoStatusProcessoAdocao(listaTipoStatus: TipoStatusProcessoAdocao[]) {
        if (listaTipoStatus != null) {
            for (var tipoStatus of listaTipoStatus)
                await this.validarTipoStatusProcessoAdocao(tipoStatus);
        }
    }

    private async validarTipoStatusProcessoAdocao(idTipoStatus: number) {
        if (!TipoStatusProcessoAdocao[idTipoStatus]) {
            throw new CustomHttpException(TIPO_STATUS_PROCESSO_DE_ADOCAO_INVALIDO);
        }
    }

    private async validarTipoStatusProcessoAdocaoPermitidoParaOng(idTipoStatus: number) {
        if (idTipoStatus == TipoStatusProcessoAdocao.EM_ANALISE || idTipoStatus == TipoStatusProcessoAdocao.DESISTENCIA_ADOTANTE || idTipoStatus == TipoStatusProcessoAdocao.ADOTADO_POR_OUTRO_USUARIO) {
            throw new CustomHttpException(TIPO_STATUS_PROCESSO_DE_ADOCAO_NAO_PERMITIDO);
        }
    }

    private async consultarPorIdParaOng(idProcessoAdocao: number, idOng: number): Promise<ConsultaProcessoAdocaoOngDTO> {
        const processoAdocaoEntity = await this.model.findOne({
            where: { idProcessoAdocao: idProcessoAdocao, idOng: idOng },
            relations: { pet: true, adotante: true }
        });

        if (!processoAdocaoEntity)
            throw new CustomHttpException(PROCESSO_ADOCAO_NAO_ENCONTRADO_COM_OS_IDS_INFORMADOS);

        return processoAdocaoEntity;
    }

    private async editarProcessoDeAdocaoECriarNotificacoesAdotantes(filtro: any, status: TipoStatusProcessoAdocao) {
        const listaProcessoAdocaoEntity = await this.model.find({ where: filtro });

        if (listaProcessoAdocaoEntity.length > 0) {
            await this.model.update(filtro, { status: status });
            await this.notificacaoService.criarParaAdotantes(listaProcessoAdocaoEntity, status);
        }
    }

    private async editarEnvolvidosProcessoDeAdocaoEPetParaStatusAdotado(idUsuario: number, ongEntity: ConsultaOngDTO, processoAdocaoDto: ConsultaProcessoAdocaoDTO, tipoStatus: number) {
        if (TipoStatusProcessoAdocao.ADOTADO_PELO_USUARIO_AUTENTICADO == tipoStatus) {
            if (!processoAdocaoDto.pet.adotado) {
                await this.petService.editarAdocao(idUsuario, processoAdocaoDto.idPet, true);

                const filtro = { idProcessoAdocao: Not(processoAdocaoDto.idProcessoAdocao), idOng: ongEntity.idOng, idPet: processoAdocaoDto.idPet, status: In([TipoStatusProcessoAdocao.EM_ANALISE, TipoStatusProcessoAdocao.PERFIL_ACEITO]) };
                await this.editarProcessoDeAdocaoECriarNotificacoesAdotantes(filtro, TipoStatusProcessoAdocao.ADOTADO_POR_OUTRO_USUARIO);
            }
            else {
                throw new CustomHttpException(NAO_PERMITIDO_EDICAO_PARA_ADOTADO_EM_PROCESSO_ADOCAO_COM_MESMO_PET);
            }
        } else if (TipoStatusProcessoAdocao.ADOTADO_PELO_USUARIO_AUTENTICADO == processoAdocaoDto.status) {
            await this.petService.editarAdocao(idUsuario, processoAdocaoDto.idPet, false);

            const filtro = { idProcessoAdocao: Not(processoAdocaoDto.idProcessoAdocao), idOng: ongEntity.idOng, idPet: processoAdocaoDto.idPet, status: In([TipoStatusProcessoAdocao.ADOTADO_POR_OUTRO_USUARIO]) };
            await this.editarProcessoDeAdocaoECriarNotificacoesAdotantes(filtro, TipoStatusProcessoAdocao.EM_ANALISE)
        }
    }

    public async editarParaOng(idUsuario: number, idProcessoAdocao: number, tipoStatus: number): Promise<boolean> {
        const ongDto = await this.ongService.consultarPorId(idUsuario);

        await this.validarTipoStatusProcessoAdocao(tipoStatus);
        await this.validarTipoStatusProcessoAdocaoPermitidoParaOng(tipoStatus);
        const processoAdocaoDto = await this.consultarPorIdParaOng(idProcessoAdocao, ongDto.idOng);

        await this.editarEnvolvidosProcessoDeAdocaoEPetParaStatusAdotado(idUsuario, ongDto, processoAdocaoDto, tipoStatus);
        await this.model.update({ idProcessoAdocao: idProcessoAdocao, idOng: ongDto.idOng }, { status: tipoStatus });
        await this.notificacaoService.criarParaAdotante(processoAdocaoDto.idAdotante, idProcessoAdocao, tipoStatus);

        return true;
    }

    public async deletarParaOng(idUsuario: number, idProcessoAdocao: number): Promise<boolean> {
        const ongDto = await this.ongService.consultarPorId(idUsuario);
        const processoAdocaoDto = await this.consultarPorIdParaOng(idProcessoAdocao, ongDto.idOng);

        if (processoAdocaoDto.status != TipoStatusProcessoAdocao.DESISTENCIA_ONG)
            throw new CustomHttpException(TIPO_STATUS_PROCESSO_DE_ADOCAO_DEVE_SER_POR_DESISTENCIA_DA_ONG);

        await this.notificacaoService.editarProcessoAdocaoParaNull(idProcessoAdocao);
        await this.model.delete({ idProcessoAdocao: idProcessoAdocao, idOng: ongDto.idOng, status: TipoStatusProcessoAdocao.DESISTENCIA_ONG });

        return true;
    }

    public async deletarTodosParaOng(idUsuario: number): Promise<boolean> {
        const ongDto = await this.ongService.consultarPorId(idUsuario);

        const listaProcessoAdocaoEntity = await this.model.find({ where: { idOng: ongDto.idOng } });
        await this.validarListaProcessoAdocaoParaExclusao(listaProcessoAdocaoEntity);
        await this.notificacaoService.deletarTodasSeExistente(idUsuario);

        await this.model.delete({ idOng: ongDto.idOng });

        return true;
    }

    private async retornarProcessoAdocaoParaOng(idOng: number, idAdotante: number, idPet: number): Promise<ConsultaProcessoAdocaoOngDTO> {
        return await this.model.findOne({
            where: { idOng: idOng, idAdotante: idAdotante, idPet: idPet },
            relations: { adotante: { usuario: { imagem: true } }, pet: { imagens: true } },
            order: { pet: { imagens: { idImagem: "ASC" } } }
        });
    }
    //

    //PET
    public async deletarTodosParaPet(idUsuario: number, idPet: number): Promise<boolean> {
        await this.petService.consultarPorId(idUsuario, idPet);

        const listaProcessoAdocaoEntity = await this.model.find({ where: { idPet: idPet } });
        await this.validarListaProcessoAdocaoParaExclusao(listaProcessoAdocaoEntity);
        await this.notificacaoService.editarListaProcessoAdocaoParaNull(listaProcessoAdocaoEntity);

        await this.model.delete({ idPet: idPet });

        return true;
    }
    //

    //AUXILIARES
    private async validarListaProcessoAdocaoParaExclusao(listaProcessoAdocaoEntity: ProcessoAdocaoDTO[]) {
        listaProcessoAdocaoEntity.forEach((processoAdocaoEntity) => {
            if (processoAdocaoEntity.status == TipoStatusProcessoAdocao.EM_ANALISE || processoAdocaoEntity.status == TipoStatusProcessoAdocao.PERFIL_ACEITO)
                throw new CustomHttpException(NAO_PERMITIDA_EXCLUSAO_TIPO_STATUS_PROCESSO_DE_ADOCAO_EM_ANALISE_OU_COM_PERFIL_ACEITO);
        });
    }
    //
}