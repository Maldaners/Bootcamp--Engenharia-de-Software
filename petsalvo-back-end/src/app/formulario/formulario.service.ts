import { Inject, forwardRef } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CustomHttpException } from "src/utils/exceptions/custom-http-exception.exception";
import { Repository } from "typeorm";
import { AdotanteService } from "../adotante/adotante.service";
import { EditaFormularioRespostaAdotanteDTO } from "./dtos/edita-formulario-resposta-adotante.dto";
import { FormularioRespostaDTO } from "./dtos/formulario-padrao/formulario-resposta.dto";
import { FormularioRespostaAdotanteDTO } from "./dtos/formulario-resposta-adotante.dto";
import { FormularioRespostaEntity } from "./entities/formulario-padrao/formulario-resposta.entity";
import { FormularioEntity } from "./entities/formulario-padrao/formulario.entity";
import { FormularioRespostaAdotanteEntity } from "./entities/formulario-resposta-adotante.entity";
import { FORMULARIO_ADOTANTE_NAO_ENCONTRADO, FORMULARIO_PADRAO_NAO_ENCONTRADO, RESPOSTA_PERTENCE_A_OUTRA_PERGUNTA, RESPOSTA_REPETIDA_OU_EXISTENTE_PARA_A_PERGUNTA, UMA_OU_MAIS_RESPOSTAS_NAO_ENCONTRADAS_COM_ID_INFORMADO } from "./responses/formulario.responses";
import { AdotanteDTO } from "../adotante/dto/adotante.dto";

const ID_FORMULARIO_PADRAO = 1;

export class FormularioService {

    constructor(
        @InjectRepository(FormularioEntity) private formularioModel: Repository<FormularioEntity>,
        @InjectRepository(FormularioRespostaEntity) private formularioRespostaModel: Repository<FormularioRespostaEntity>,
        @InjectRepository(FormularioRespostaAdotanteEntity) private formularioRespostaAdotanteModel: Repository<FormularioRespostaAdotanteEntity>,
        @Inject(forwardRef(() => AdotanteService)) private readonly adotanteService: AdotanteService
    ) { }

    public async consultarFormularioPadrao() {
        const formulario = await this.formularioModel.findOne({ where: { idFormulario: ID_FORMULARIO_PADRAO }, relations: { formularioPergunta: { formularioResposta: true } } });

        if (!formulario)
            throw new CustomHttpException(FORMULARIO_PADRAO_NAO_ENCONTRADO);

        return formulario;
    }

    private async criarFormulario(adotanteDto: AdotanteDTO, listaRespostasDTO: FormularioRespostaAdotanteDTO[]) {
        listaRespostasDTO = await this.retornarListaDiferencaRespostas(listaRespostasDTO, await this.retornarFormularioRespondidoAdotante(adotanteDto.idAdotante));
        listaRespostasDTO.forEach(async (resposta) => {
            await this.formularioRespostaAdotanteModel.save({ ...resposta, idAdotante: adotanteDto.idAdotante });
        });
    }

    public async criarFormularioAdotante(idUsuario: number, listaRespostasDTO: FormularioRespostaAdotanteDTO[]): Promise<boolean> {
        await this.consultarFormularioPadrao();

        const adotanteDto = await this.adotanteService.consultarPorId(idUsuario);
        const listaRespostasValidas = await this.retornarListaRespostasValidas();

        await this.validarIdRespostasValidas(listaRespostasDTO, listaRespostasValidas);
        await this.validarIdRespostasExistentes(listaRespostasDTO, listaRespostasValidas, adotanteDto.idAdotante);
        await this.validarIdRespostasRepetidas(listaRespostasDTO);
        await this.validarIdRespostasParaUmaMesmaPergunta(listaRespostasDTO, listaRespostasValidas);

        await this.criarFormulario(adotanteDto, listaRespostasDTO);

        return true;
    }

    public async criarFormularioAdotanteOpcional(adotanteDto: AdotanteDTO, listaRespostasDTO: FormularioRespostaAdotanteDTO[]): Promise<boolean> {
        if (listaRespostasDTO != null) {
            await this.validarIdRespostasExistentes(listaRespostasDTO, await this.retornarListaRespostasValidas(), adotanteDto.idAdotante);
            await this.criarFormulario(adotanteDto, listaRespostasDTO);

            return true;
        }

        return false;
    }

    public async validarRespostasFormularioAdotanteOpcional(listaRespostasDTO: FormularioRespostaAdotanteDTO[]) {
        if (listaRespostasDTO != null) {
            await this.consultarFormularioPadrao();
            const listaRespostasValidas = await this.retornarListaRespostasValidas();

            await this.validarIdRespostasValidas(listaRespostasDTO, listaRespostasValidas);
            await this.validarIdRespostasRepetidas(listaRespostasDTO);
            await this.validarIdRespostasParaUmaMesmaPergunta(listaRespostasDTO, listaRespostasValidas);
        }
    }

    private async retornarListaDiferencaRespostas(listaRespostasDtoNova: FormularioRespostaAdotanteDTO[], listaRespostasDtoRegistradas: FormularioRespostaAdotanteDTO[]) {
        return listaRespostasDtoNova.filter((respostaNova) => {
            let inexistente = true;

            listaRespostasDtoRegistradas.forEach((respostaRegistrada) => {
                if (respostaNova.idFormularioResposta == respostaRegistrada.idFormularioResposta) {
                    inexistente = false;
                    return;
                }
            });

            return inexistente;
        });
    }

    private async retornarListaRespostasValidas() {
        return await this.formularioRespostaModel.find({ where: { formularioPergunta: { formulario: { idFormulario: ID_FORMULARIO_PADRAO } } }, relations: { formularioPergunta: true } });
    }

    private async validarIdRespostasValidas(listaRespostasDto: FormularioRespostaAdotanteDTO[], listaRespostasDtoValidas: FormularioRespostaDTO[]) {
        let encontrada: boolean;
        listaRespostasDto.forEach((resposta) => {
            encontrada = false

            listaRespostasDtoValidas.forEach((respostaValida) => {
                if (resposta.idFormularioResposta == respostaValida.idFormularioResposta) {
                    encontrada = true;
                    return;
                }
            });

            if (!encontrada)
                throw new CustomHttpException(UMA_OU_MAIS_RESPOSTAS_NAO_ENCONTRADAS_COM_ID_INFORMADO);
        });
    }

    private async retornarListaIdsPerguntasRespondidas(listaRespostasDto: FormularioRespostaAdotanteDTO[], listaRespostasDtoValidas: FormularioRespostaEntity[]) {
        let listaIdsPerguntasRespondidas = [];

        listaRespostasDto.forEach((resposta) => {
            listaRespostasDtoValidas.forEach((respostavalida) => {
                if (resposta.idFormularioResposta == respostavalida.idFormularioResposta) {
                    listaIdsPerguntasRespondidas.push(respostavalida.idFormularioPergunta);
                    return;
                }
            });
        });

        return listaIdsPerguntasRespondidas;
    };

    private async retornarRespostasRegistradas(idAdotante: number) {
        return await this.formularioRespostaAdotanteModel.find({ where: { idAdotante: idAdotante }, relations: { formularioResposta: true } });
    }

    private async validarIdRespostasExistentes(listaRespostasDto: FormularioRespostaAdotanteDTO[], listaRespostasDtoValidas: FormularioRespostaEntity[], idAdotante: number) {
        const listaRespostasRegistradas = await this.retornarRespostasRegistradas(idAdotante);
        const listaIdsPerguntasRespondidas = await this.retornarListaIdsPerguntasRespondidas(listaRespostasDto, listaRespostasDtoValidas);

        listaIdsPerguntasRespondidas.forEach((idPerguntaRespondida) => {
            listaRespostasRegistradas.forEach((respostaRegistrada) => {
                if (respostaRegistrada.formularioResposta.idFormularioPergunta == idPerguntaRespondida) {
                    throw new CustomHttpException(RESPOSTA_REPETIDA_OU_EXISTENTE_PARA_A_PERGUNTA);
                }
            });
        });
    }

    private async validarIdRespostasRepetidas(listaRespostasDTO: FormularioRespostaAdotanteDTO[]) {
        let listaIdsRespostasNaoRepetidas = [];

        listaRespostasDTO.forEach(resposta => {
            if (!listaIdsRespostasNaoRepetidas.includes(resposta.idFormularioResposta)) {
                listaIdsRespostasNaoRepetidas.push(resposta.idFormularioResposta);
            } else {
                throw new CustomHttpException(RESPOSTA_REPETIDA_OU_EXISTENTE_PARA_A_PERGUNTA);
            }
        });
    }

    private async validarIdRespostasParaUmaMesmaPergunta(listaRespostasDto: FormularioRespostaAdotanteDTO[], listaRespostasDtoValidas: FormularioRespostaEntity[]) {
        let listaIdsPerguntasNaoRepetidas = [];

        listaRespostasDto.forEach(resposta => {
            listaRespostasDtoValidas.forEach(respostaValida => {
                if (resposta.idFormularioResposta == respostaValida.idFormularioResposta) {
                    if (!listaIdsPerguntasNaoRepetidas.includes(respostaValida.idFormularioPergunta)) {
                        listaIdsPerguntasNaoRepetidas.push(respostaValida.idFormularioPergunta);
                    } else {
                        throw new CustomHttpException(RESPOSTA_REPETIDA_OU_EXISTENTE_PARA_A_PERGUNTA);
                    }
                }
            });
        });
    }

    private async retornarFormularioRespondidoAdotante(idAdotante: number) {
        return await this.formularioRespostaAdotanteModel.find({
            where: { idAdotante: idAdotante }
        });
    }

    public async consultarFormularioRespondidoAdotante(idUsuario: number) {
        const adotanteDto = await this.adotanteService.consultarPorId(idUsuario);
        const listaFormularioRespostasAdotante = await this.retornarFormularioRespondidoAdotante(adotanteDto.idAdotante);

        if (!listaFormularioRespostasAdotante.length)
            throw new CustomHttpException(FORMULARIO_ADOTANTE_NAO_ENCONTRADO);

        return listaFormularioRespostasAdotante;
    }

    private async validarRespostasPermitidasPorPergunta(idPergunta: number, resposta: EditaFormularioRespostaAdotanteDTO) {
        const listaRespostasValidas = await this.formularioRespostaModel.find({ where: { formularioPergunta: { idFormularioPergunta: idPergunta, formulario: { idFormulario: ID_FORMULARIO_PADRAO } } }, relations: { formularioPergunta: true } });
        let encontrada = false;

        listaRespostasValidas.forEach((respostaValida) => {
            if (respostaValida.idFormularioResposta == resposta.idFormularioResposta) {
                encontrada = true;
                return;
            }
        });

        return encontrada;
    }

    public async editarFormularioRespondidoAdotante(idUsuario: number, listaRespostasDto: EditaFormularioRespostaAdotanteDTO[]) {
        await this.consultarFormularioRespondidoAdotante(idUsuario);

        const adotanteDto = await this.adotanteService.consultarPorId(idUsuario);
        const listaRespostasRegistradas = await this.retornarRespostasRegistradas(adotanteDto.idAdotante);
        const listaRespostasValidas = await this.retornarListaRespostasValidas();

        await this.validarIdRespostasValidas(listaRespostasDto, listaRespostasValidas);

        for (var resposta of listaRespostasDto) {
            if (!await this.validarRespostasPermitidasPorPergunta(resposta.idFormularioPergunta, resposta))
                throw new CustomHttpException(RESPOSTA_PERTENCE_A_OUTRA_PERGUNTA);

            let respostaEditada = false;
            for (var respostaRegistrada of listaRespostasRegistradas) {
                if (resposta.idFormularioPergunta == respostaRegistrada.formularioResposta.idFormularioPergunta) {
                    delete resposta.idFormularioPergunta;
                    await this.formularioRespostaAdotanteModel.update({ idAdotante: adotanteDto.idAdotante, idFormularioResposta: respostaRegistrada.idFormularioResposta }, resposta);
                    respostaEditada = true;

                    break;
                }
            }

            if (!respostaEditada)
                await this.formularioRespostaAdotanteModel.save({ ...resposta, idAdotante: adotanteDto.idAdotante });
        }

        return true;
    }

    public async deletarFormularioRespondidoAdotanteSeExistente(idUsuario: number): Promise<boolean> {
        try {
            await this.deletarFormularioRespondidoAdotante(idUsuario);
        } catch (error) {
            return false;
        }

        return true;
    }

    public async deletarFormularioRespondidoAdotante(idUsuario: number): Promise<boolean> {
        await this.consultarFormularioRespondidoAdotante(idUsuario);

        const adotanteDto = await this.adotanteService.consultarPorId(idUsuario);
        await this.formularioRespostaAdotanteModel.delete({ idAdotante: adotanteDto.idAdotante });

        return true;
    }
}