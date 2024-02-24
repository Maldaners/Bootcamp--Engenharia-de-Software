import { Inject, forwardRef } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CustomHttpException } from "src/utils/exceptions/custom-http-exception.exception";
import { Repository } from "typeorm";
import { OngDTO } from "../ong/dto/ong.dto";
import { OngService } from "../ong/ong.service";
import { EditaPixDTO } from "./dtos/edita-pix.dto";
import { PixDTO } from "./dtos/pix.dto";
import { PixEntity } from "./entities/pix.entity";
import { TipoChave } from "./enum/tipo-chave.enum";
import { CHAVE_PIX_EXISTENTE_COM_TIPO_E_NOME_INFORMADOS, CHAVE_PIX_NAO_ENCONTRADA_COM_ID, NAO_PERMITIDO_CADASTRO_DE_MAIS_DE_5_CHAVES_PIX, NENHUMA_CHAVE_PIX_CADASTRADA, TIPO_DA_CHAVE_PIX_INVALIDA } from "./responses/pix.responses";

export class PixService {

    private readonly limiteChavesPix: number = 5;

    constructor(
        @InjectRepository(PixEntity) private model: Repository<PixEntity>,
        @Inject(forwardRef(() => OngService)) private readonly ongService: OngService
    ) { }

    public async criar(idUsuario: number, listaPixDto: PixDTO[]): Promise<boolean> {
        await this.validarTiposDasChavesPix(listaPixDto);

        const ongDto = await this.ongService.consultarPorId(idUsuario);
        const listaPixDtoRegistrados = await this.retornarListaChavesPix(ongDto.idOng);

        listaPixDto = await this.retornarListaDiferencaChavesPix(listaPixDto, listaPixDtoRegistrados);

        if (listaPixDtoRegistrados.length + listaPixDto.length > this.limiteChavesPix)
            throw new CustomHttpException(NAO_PERMITIDO_CADASTRO_DE_MAIS_DE_5_CHAVES_PIX);

        await this.criarListaPix(ongDto, listaPixDto);

        return true;
    }

    public async criarPixOpcional(ongDto: OngDTO, listaPixDto: PixDTO[]): Promise<boolean> {
        if (listaPixDto != null) {
            await this.criarListaPix(ongDto, listaPixDto);            
            return true;
        }

        return false;
    }

    private async criarListaPix(ongDto: OngDTO, listaPixDto: PixDTO[]) {
        listaPixDto.forEach(async (pix) => {
            await this.model.save({ ...pix, idOng: ongDto.idOng });
        });
    }

    public async validarPixOpcional(listaPixDto: PixDTO[]) {
        if (listaPixDto != null) {
            await this.validarTiposDasChavesPix(listaPixDto);

            if (listaPixDto.length > this.limiteChavesPix)
                throw new CustomHttpException(NAO_PERMITIDO_CADASTRO_DE_MAIS_DE_5_CHAVES_PIX);
        }
    }

    private async validarTipoDaChavePix(pixDto: PixDTO) {
        if (!TipoChave[pixDto.tipoChave]) {
            throw new CustomHttpException(TIPO_DA_CHAVE_PIX_INVALIDA);
        }
    }

    private async validarTiposDasChavesPix(listaPixDto: PixDTO[]) {
        for (var pix of listaPixDto) {
            await this.validarTipoDaChavePix(pix);
        }
    }

    private async retornarListaChavesPix(idOng: number): Promise<PixDTO[]> {
        return await this.model.find({
            where: { idOng: idOng }
        });
    }

    private async retornarListaDiferencaChavesPix(pixDtoNovo: PixDTO[], pixDtoRegistrados: PixDTO[]) {
        return pixDtoNovo.filter((pixNovo) => {
            let inexistente = true;

            pixDtoRegistrados.forEach((pixRegistrado) => {
                if (pixRegistrado.tipoChave === pixNovo.tipoChave && pixRegistrado.chave.toLocaleLowerCase() === pixNovo.chave.toLocaleLowerCase()) {
                    inexistente = false;
                    return;
                }
            });

            return inexistente;
        });
    }

    public async consultarPorId(idUsuario: number, idPix: number): Promise<PixDTO> {
        const ongDto = await this.ongService.consultarPorId(idUsuario);

        const pixEntity = await this.model.findOne({
            where: { idOng: ongDto.idOng, idPix: idPix }
        });

        if (!pixEntity)
            throw new CustomHttpException(CHAVE_PIX_NAO_ENCONTRADA_COM_ID);


        return pixEntity;
    }

    public async consultarTodos(idUsuario: number): Promise<PixDTO[]> {
        const ongDto = await this.ongService.consultarPorId(idUsuario);

        const listaPixEntity = await this.retornarListaChavesPix(ongDto.idOng);

        if (!listaPixEntity.length)
            throw new CustomHttpException(NENHUMA_CHAVE_PIX_CADASTRADA);

        return listaPixEntity;
    }

    private async editarPix(idUsuario: number, idOng: number, idPix: number, pixDto: PixDTO) {
        await this.validarTipoDaChavePix(pixDto);
        await this.consultarPorId(idUsuario, idPix);

        (await this.consultarTodos(idUsuario)).forEach((pix) => {
            if (pix.tipoChave === pixDto.tipoChave && pix.chave.toLowerCase() === pixDto.chave.toLowerCase())
                throw new CustomHttpException(CHAVE_PIX_EXISTENTE_COM_TIPO_E_NOME_INFORMADOS);
        });

        await this.model.update({ idOng: idOng, idPix: idPix }, pixDto);
    }

    public async editar(idUsuario: number, idPix: number, pixDto: PixDTO): Promise<boolean> {
        const ongDto = await this.ongService.consultarPorId(idUsuario);
        await this.editarPix(idUsuario, ongDto.idOng, idPix, pixDto);

        return true;
    }

    public async editarLista(idUsuario: number, listaEditaPixDto: EditaPixDTO[]): Promise<boolean> {
        const ongDto = await this.ongService.consultarPorId(idUsuario);

        for (const pixDto of listaEditaPixDto) {
            await this.editarPix(idUsuario, ongDto.idOng, pixDto.idPix, pixDto);
        }

        return true;
    }

    public async deletarTodos(idUsuario: number): Promise<boolean> {
        const ongDto = await this.ongService.consultarPorId(idUsuario);

        await this.model.delete({ idOng: ongDto.idOng });

        return true;
    }

    public async deletar(idUsuario: number, idPix: number): Promise<boolean> {
        const ongDto = await this.ongService.consultarPorId(idUsuario);
        await this.consultarPorId(idUsuario, idPix);

        await this.model.delete({ idOng: ongDto.idOng, idPix: idPix });

        return true;
    }
}