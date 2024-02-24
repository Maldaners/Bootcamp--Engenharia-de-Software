import { HttpStatus } from "@nestjs/common";
import { ApiResponseSchemaHost } from "@nestjs/swagger";

export const USUARIO_NAO_AUTORIZADO: ApiResponseSchemaHost = {
    status: HttpStatus.FORBIDDEN,
    schema: {
        example: {
            message: 'USUARIO_NAO_AUTORIZADO',
            statusCode: HttpStatus.FORBIDDEN
        }
    },
    description: 'Usuário não autorizado'
}