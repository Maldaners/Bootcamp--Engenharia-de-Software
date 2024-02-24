import { SetMetadata } from '@nestjs/common';
import { TipoUsuario } from 'src/app/usuario/enum/tipoUsuario.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...tipoUsuario: TipoUsuario[]) => SetMetadata(ROLES_KEY, tipoUsuario);