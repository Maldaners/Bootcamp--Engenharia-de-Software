import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TipoUsuario } from 'src/app/usuario/enum/tipoUsuario.enum';
import { CustomHttpException } from 'src/utils/exceptions/custom-http-exception.exception';
import { ROLES_KEY } from '../decorators/autorizacao.decorator';
import { USUARIO_NAO_AUTORIZADO } from '../responses/autorizacao.responses';

@Injectable()
export class AutorizacaoGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {

        const rolesRequiridas = this.reflector.getAllAndOverride<TipoUsuario[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!rolesRequiridas) {
            return true;
        }

        const req = context.switchToHttp().getRequest();
        const roles = rolesRequiridas.some((role) => req.usuario.tipoUsuario == (role));

        if (!roles)
            throw new CustomHttpException(USUARIO_NAO_AUTORIZADO);

        return rolesRequiridas.some((role) => req.usuario.tipoUsuario == (role));
    }
}