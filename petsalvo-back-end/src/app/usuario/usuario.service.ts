import { Inject, forwardRef } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EncryptUtils } from "src/utils/encrypt.utils";
import { CustomHttpException } from "src/utils/exceptions/custom-http-exception.exception";
import { Repository } from "typeorm";
import { ImagemUsuarioService } from "../imagem/imagem-usuario/imagem-usuario.service";
import { UsuarioDTO } from "./dto/usuario.dtos";
import { UsuarioEntity } from "./entities/usuario.entity";
import { TipoUsuario } from "./enum/tipoUsuario.enum";
import { USUARIO_EXISTENTE_COM_EMAIL_INFORMADO, USUARIO_NAO_ENCONTRADO_COM_ID } from "./responses/usuario.responses";

export class UsuarioService {

    constructor(
        @InjectRepository(UsuarioEntity) private model: Repository<UsuarioEntity>,
        private readonly encrypt: EncryptUtils,
        @Inject(forwardRef(() => ImagemUsuarioService)) private readonly imagemUsuarioService: ImagemUsuarioService
    ) { }

    public async consultarPorEmail(email: string): Promise<UsuarioEntity> {
        return await this.model.findOne({ where: { email }, relations: { imagem: true } });
    }

    private async verificarUsuarioComEmail(usuario: UsuarioDTO) {
        if (await this.consultarPorEmail(usuario.email) != null) {
            throw new CustomHttpException(USUARIO_EXISTENTE_COM_EMAIL_INFORMADO);
        }
    }

    private async criptografarSenha(usuario: UsuarioDTO): Promise<UsuarioDTO> {
        usuario.senha = await this.encrypt.getEncryptedValue(usuario.senha);
        return usuario;
    }

    public async normalizar(usuario: UsuarioDTO, tipoUsuario: TipoUsuario): Promise<UsuarioDTO> {
        await this.verificarUsuarioComEmail(usuario);
        usuario = await this.criptografarSenha(usuario);
        usuario.tipoUsuario = tipoUsuario;
        usuario.email = usuario.email.toLowerCase();

        return usuario;
    }

    public async consultarPorId(id: number): Promise<UsuarioEntity> {
        const usuario = await this.model.findOne({ where: { idUsuario: id } });

        if (!usuario)
            throw new CustomHttpException(USUARIO_NAO_ENCONTRADO_COM_ID);

        //TODO: Validar padrão de criação de DTOs para retornar dados especificos p/ melhor performance
        delete usuario.senha;

        return usuario;
    }

    //TODO: Estudar uma melhora p/ performance de update (devolver um modelo com as alterações, ao invés de ler novamente)
    public async editar(id: number, usuario: UsuarioDTO): Promise<UsuarioDTO> {
        await this.verificarEdicaoDeEmail(id, usuario);

        usuario.senha = await this.encrypt.getEncryptedValue(usuario.senha);
        await this.model.update({ idUsuario: id }, usuario);

        return await this.consultarPorId(id);
    }

    public async verificarEdicaoDeEmail(id: number, usuarioAtual: UsuarioDTO) {
        const usuarioAnterior = await this.consultarPorId(id);

        if (usuarioAnterior.email != usuarioAtual.email)
            await this.verificarUsuarioComEmail(usuarioAtual);
    }

    public async deletar(id: number, tipoUsuario: TipoUsuario): Promise<boolean> {
        await this.consultarPorId(id);

        await this.imagemUsuarioService.deletarSeExistente(id, tipoUsuario);
        await this.model.delete(id);

        return true;
    }
}