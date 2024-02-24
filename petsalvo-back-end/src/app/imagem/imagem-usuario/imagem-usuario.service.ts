import { Request } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as path from "path";
import { TipoUsuario } from "src/app/usuario/enum/tipoUsuario.enum";
import { CustomHttpException } from "src/utils/exceptions/custom-http-exception.exception";
import { FileUtils } from "src/utils/file.utils";
import { Repository } from "typeorm";
import { ImagemDTO } from "../dto/imagem.dto";
import { IMAGEM_NAO_ANEXADA } from "../responses/imagem.responses";
import { ImagemUsuarioEntity } from "./entities/imagem-usuario.entity";
import { IMAGEM_NAO_ENCONTRADA_PARA_O_TIPO_E_ID_DO_USUARIO } from "./responses/imagem-usuario.responses";

export class ImagemUsuarioService {

    constructor(
        @InjectRepository(ImagemUsuarioEntity) private model: Repository<ImagemUsuarioEntity>
    ) { }

    public async criar(@Request() req: any, idUsuario: number, imagemDto: ImagemDTO, imagem: Express.Multer.File): Promise<boolean> {
        await this.validarImagemAnexada(imagem);

        const url = path.join(imagem.destination, imagem.filename);
        await this.model.save({ url: url, idUsuario: idUsuario });

        return true;
    }

    private async validarImagemAnexada(imagem: Express.Multer.File) {
        try {
            imagem.destination;
        } catch (error) {
            throw new CustomHttpException(IMAGEM_NAO_ANEXADA);
        }
    }

    public async consultarPorId(idUsuario: number, tipoUsuario: TipoUsuario): Promise<ImagemUsuarioEntity> {
        const imagemEntity = await this.model.findOne({
            where: { idUsuario: idUsuario, usuario: { tipoUsuario: tipoUsuario } }
        });

        if (!imagemEntity)
            throw new CustomHttpException(IMAGEM_NAO_ENCONTRADA_PARA_O_TIPO_E_ID_DO_USUARIO);

        return imagemEntity;
    }

    private async deletarImagemUsuario(idUsuario: number, imagemUsuarioEntity: ImagemUsuarioEntity) {
        await this.model.delete({ idUsuario: idUsuario });
        await new FileUtils().deletePathFile(imagemUsuarioEntity.url);
    }

    public async deletarSeExistente(idUsuario: number, tipoUsuario: TipoUsuario) {
        try {
            const imagemUsuarioEntity = await this.consultarPorId(idUsuario, tipoUsuario);
            await this.deletarImagemUsuario(idUsuario, imagemUsuarioEntity);
        } catch (error) {
            return false;
        }

        return true;
    }

    public async deletar(idUsuario: number, tipoUsuario: TipoUsuario): Promise<boolean> {
        const imagemUsuarioEntity = await this.consultarPorId(idUsuario, tipoUsuario);
        await this.deletarImagemUsuario(idUsuario, imagemUsuarioEntity);

        return true;
    }
}