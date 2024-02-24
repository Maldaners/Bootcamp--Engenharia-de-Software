import { HttpStatus } from "@nestjs/common";
import { ApiResponseMetadata, ApiResponseSchemaHost } from "@nestjs/swagger";
import { LoginDTO } from "../dto/login.dto";

export const USUARIO_OU_SENHA_INVALIDOS: ApiResponseSchemaHost = {
    status: HttpStatus.UNAUTHORIZED,
    schema: {
        example: {
            message: "USUARIO_OU_SENHA_INVALIDOS",
            statusCode: HttpStatus.UNAUTHORIZED
        }
    },
    description: 'Usuário ou senha inválidos'
}

export const USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO: ApiResponseSchemaHost = {
    status: HttpStatus.UNAUTHORIZED,
    schema: {
        example: {
            message: "USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO",
            statusCode: HttpStatus.UNAUTHORIZED
        }
    },
    description: 'Usuário não autenticado ou com token expirado'
}

export const USUARIO_AUTENTICADO: ApiResponseMetadata = {
    status: HttpStatus.CREATED,
    type: LoginDTO,
    description: 'Usuário autenticado com sucesso'
}
