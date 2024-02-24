import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-local';
import { AutenticacaoService } from 'src/app/autenticacao/autenticacao.service';
import { LoginDTO } from '../dto/login.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly autenticacaoService: AutenticacaoService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(email: string, senha: string): Promise<LoginDTO> {
    return await this.autenticacaoService.validarUsuario(email, senha);
  }
}