import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EncryptUtils } from 'src/utils/encrypt.utils';
import { CustomHttpException } from 'src/utils/exceptions/custom-http-exception.exception';
import { UsuarioEntity } from '../usuario/entities/usuario.entity';
import { TipoUsuario } from '../usuario/enum/tipoUsuario.enum';
import { UsuarioService } from '../usuario/usuario.service';
import { LoginDTO } from './dto/login.dto';
import { USUARIO_OU_SENHA_INVALIDOS } from './responses/autenticacao.responses';

@Injectable()
export class AutenticacaoService {

  constructor(
    private readonly usuarioService: UsuarioService,
    private jwtService: JwtService,
    private readonly encrypt: EncryptUtils,
  ) { }

  public async validarUsuario(email: string, senha: string): Promise<LoginDTO> {
    const usuario = await this.usuarioService.consultarPorEmail(email);

    if (usuario != null && await this.encrypt.compareValues(senha, usuario.senha))
      return await this.gerarToken(usuario);

    throw new CustomHttpException(USUARIO_OU_SENHA_INVALIDOS);
  }

  private async gerarToken(usuario: UsuarioEntity): Promise<LoginDTO> {
    return {
      accessToken: this.jwtService.sign({
        idUsuario: usuario.idUsuario,
        email: usuario.email,
        nome: usuario.nome,
        tipoUsuario: usuario.tipoUsuario,
        imagem: usuario.imagem
      }),
      tipoUsuario: TipoUsuario[usuario.tipoUsuario]
    };
  }
}