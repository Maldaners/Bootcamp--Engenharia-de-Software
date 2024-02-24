import { Inject, forwardRef } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CustomHttpException } from "src/utils/exceptions/custom-http-exception.exception";
import { Repository } from "typeorm";
import { AdotanteService } from "../adotante/adotante.service";
import { OngService } from "../ong/ong.service";
import { ProcessoAdocaoEntity } from "../processo-adocao/entities/processo-adocao.entity";
import { TipoStatusProcessoAdocao } from "../processo-adocao/enums/tipo-status-processo-adocao.enum";
import { NotificacaoDTO } from "./dto/notificacao.dto";
import { NotificacaoEntity } from "./entities/notificacao.entity";
import { NENHUMA_NOTIFICACAO_CADASTRADA, NENHUMA_NOTIFICACAO_ENCONTRADA_COM_PARAMETRO_INFORMADO, NOTIFICACAO_NAO_ENCONTRADA_COM_ID_INFORMADO } from "./responses/notificacao.responses";

export class NotificacaoService {

    constructor(
        @InjectRepository(NotificacaoEntity) private model: Repository<NotificacaoEntity>,
        @Inject(forwardRef(() => AdotanteService)) private readonly adotanteService: AdotanteService,
        @Inject(forwardRef(() => OngService)) private readonly ongService: OngService
    ) { }

    private async criar(idUsuario: number, idProcessoAdocao: number, statusProcessoAdocao: TipoStatusProcessoAdocao) {
        await this.model.save({
            idUsuario: idUsuario,
            idProcessoAdocao: idProcessoAdocao,
            visualizada: false,
            statusProcessoAdocaoNotificado: statusProcessoAdocao,
            dataVisualizacao: null
        });
    }

    public async criarParaOng(idOng: number, idProcessoAdocao: number, statusProcessoAdocao: TipoStatusProcessoAdocao) {
        const ongDto = await this.ongService.consultarPorIdOng(idOng);
        await this.criar(ongDto.usuario.idUsuario, idProcessoAdocao, statusProcessoAdocao);

        return true;
    }

    public async criarParaAdotante(idAdotante: number, idProcessoAdocao: number, statusProcessoAdocao: TipoStatusProcessoAdocao) {
        const adotanteDto = await this.adotanteService.consultarPorIdAdotante(idAdotante);
        await this.criar(adotanteDto.usuario.idUsuario, idProcessoAdocao, statusProcessoAdocao);

        return true;
    }

    public async criarParaAdotantes(listaProcessoAdocaoEntity: ProcessoAdocaoEntity[], statusProcessoAdocao: TipoStatusProcessoAdocao) {
        listaProcessoAdocaoEntity.forEach(async (processoAdocaoEntity) => {
            await this.criarParaAdotante(processoAdocaoEntity.idAdotante, processoAdocaoEntity.idProcessoAdocao, statusProcessoAdocao);
        });

        return true;
    }

    public async consultarPorId(idUsuario: number, idNotificacao: number): Promise<NotificacaoDTO> {
        const notificacaoEntity = await this.model.findOne({
            where: { idUsuario: idUsuario, idNotificacao: idNotificacao },
            relations: { processoAdocao: true }
        });

        if (!notificacaoEntity)
            throw new CustomHttpException(NOTIFICACAO_NAO_ENCONTRADA_COM_ID_INFORMADO);

        return notificacaoEntity;
    }

    public async consultarTodas(idUsuario: number): Promise<NotificacaoDTO[]> {
        const listaNotificacaoEntity = await this.model.find({
            where: { idUsuario: idUsuario },
            relations: { processoAdocao: true }
        });

        if (listaNotificacaoEntity.length == 0)
            throw new CustomHttpException(NENHUMA_NOTIFICACAO_CADASTRADA);

        return listaNotificacaoEntity;
    }

    public async consultarTodasComFiltro(idUsuario: number, visualizadas: boolean): Promise<NotificacaoDTO[]> {
        const listaNotificacaoEntity = await this.model.find({
            where: { idUsuario: idUsuario, visualizada: visualizadas },
            relations: { processoAdocao: true }
        });

        if (listaNotificacaoEntity.length == 0)
            throw new CustomHttpException(NENHUMA_NOTIFICACAO_ENCONTRADA_COM_PARAMETRO_INFORMADO);

        return listaNotificacaoEntity;
    }

    public async editarParaVisualizada(idUsuario: number, idNotificacao: number) {
        await this.consultarPorId(idUsuario, idNotificacao);

        await this.model.update({ idUsuario: idUsuario, idNotificacao: idNotificacao }, { visualizada: true });

        return true;
    }

    private async retornarDataVisualizacao(notificacaoEntity: NotificacaoEntity) {
        try {
            return notificacaoEntity.dataVisualizacao;
        } catch (error) {
            return null;
        }
    }

    public async editarProcessoAdocaoParaNull(idProcessoAdocao: number) {
        const notificaoEntity = await this.model.findOne({ where: { idProcessoAdocao: idProcessoAdocao } });

        await this.model.update(
            { idProcessoAdocao: idProcessoAdocao },
            { processoAdocao: null, idProcessoAdocao: null, dataVisualizacao: await this.retornarDataVisualizacao(notificaoEntity) }
        );

        return true;
    }

    public async editarListaProcessoAdocaoParaNull(listaProcessoAdocaoEntity: ProcessoAdocaoEntity[]) {
        listaProcessoAdocaoEntity.forEach(async (processoAdocaoEntity) => {
            await this.editarProcessoAdocaoParaNull(processoAdocaoEntity.idProcessoAdocao);
        });

        return true;
    }

    public async deletar(idUsuario: number, idNotificacao: number) {
        await this.consultarPorId(idUsuario, idNotificacao);

        await this.model.delete({ idUsuario: idUsuario, idNotificacao: idNotificacao });

        return true;
    }

    public async deletarTodas(idUsuario: number) {
        await this.consultarTodas(idUsuario);

        await this.model.delete({ idUsuario: idUsuario });

        return true;
    }

    public async deletarTodasSeExistente(idUsuario: number) {
        try {
            await this.consultarTodas(idUsuario);
            await this.model.delete({ idUsuario: idUsuario });
        } catch (error) {
            return false;
        }

        return true;
    }
}