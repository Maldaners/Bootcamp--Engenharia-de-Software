import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { CustomHttpException } from 'src/utils/exceptions/custom-http-exception.exception';
import { IS_PUBLIC_KEY } from '../decorators/autenticacao.decorator';
import { USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO } from '../responses/autenticacao.responses';

@Injectable()
export class AutenticacaoGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const isPublico = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublico) {
            return true;
        }

        const requisicao = context.switchToHttp().getRequest();
        const token = this.extrairTokenDoHeader(requisicao);

        if (!token) {
            throw new CustomHttpException(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO);
        }

        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: process.env.JWT_SECRET
                }
            );

            requisicao['usuario'] = payload;

        } catch {
            throw new CustomHttpException(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO);
        }

        return true;
    }

    private extrairTokenDoHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}