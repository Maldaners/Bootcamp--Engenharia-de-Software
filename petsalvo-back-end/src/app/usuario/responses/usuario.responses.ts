import { HttpStatus } from "@nestjs/common";
import { ApiResponseSchemaHost } from "@nestjs/swagger";

export const USUARIO_EXISTENTE_COM_EMAIL_INFORMADO: ApiResponseSchemaHost = {
    status: HttpStatus.BAD_REQUEST,
    schema: {
        example: {
            message: 'USUARIO_EXISTENTE_COM_EMAIL_INFORMADO',
            statusCode: HttpStatus.BAD_REQUEST
        }
    },
    description: 'Usuário existente com o e-mail informado'
}

export const USUARIO_NAO_ENCONTRADO_COM_ID: ApiResponseSchemaHost = {
    status: HttpStatus.NOT_FOUND,
    schema: {
        example: {
            message: 'USUARIO_NAO_ENCONTRADO_COM_ID',
            statusCode: HttpStatus.NOT_FOUND
        }
    },
    description: 'Usuário não encontrado com o id informado'
}