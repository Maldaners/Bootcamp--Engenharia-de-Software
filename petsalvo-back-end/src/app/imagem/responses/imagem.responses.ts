import { HttpStatus } from "@nestjs/common";
import { ApiResponseSchemaHost } from "@nestjs/swagger";

export const IMAGEM_NAO_ANEXADA: ApiResponseSchemaHost = {
    status: HttpStatus.BAD_REQUEST,
    schema: {
        example: {
            message: 'IMAGEM_NAO_ANEXADA',
            statusCode: HttpStatus.BAD_REQUEST
        },
    },
    description: `A imagem não foi anexada`
}

export const FORMATO_DE_IMAGEM_NAO_PERMITIDO: ApiResponseSchemaHost = {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    schema: {
        example: {
            message: 'FORMATO_DE_IMAGEM_NAO_PERMITIDO',
            statusCode: HttpStatus.UNPROCESSABLE_ENTITY
        },
    },
    description: `O formato/tipo da imagem não é permitido. Opte por: '.jpeg', '.jpg' ou '.png'.`
}

export const NAO_PERMITIDO_UPLOADO_DE_MAIS_DE_UMA_IMAGEM: ApiResponseSchemaHost = {
    status: HttpStatus.METHOD_NOT_ALLOWED,
    schema: {
        example: {
            message: 'NAO_PERMITIDO_UPLOADO_DE_MAIS_DE_UMA_IMAGEM',
            statusCode: HttpStatus.METHOD_NOT_ALLOWED
        },
    },
    description: `Não é permitido o upload de mais de uma imagem`
}

export const NAO_PERMITIDO_CADASTRO_DE_MAIS_DE_5_IMAGENS: ApiResponseSchemaHost = {
    status: HttpStatus.METHOD_NOT_ALLOWED,
    schema: {
        example: {
            message: 'NAO_PERMITIDO_CADASTRO_DE_MAIS_DE_5_IMAGENS',
            statusCode: HttpStatus.METHOD_NOT_ALLOWED
        },
    },
    description: `Não é permitido o cadastro de mais de cinco imagens`
}