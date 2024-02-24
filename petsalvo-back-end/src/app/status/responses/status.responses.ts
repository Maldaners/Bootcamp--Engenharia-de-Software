import { HttpStatus } from "@nestjs/common"
import { ApiResponseMetadata, ApiResponseSchemaHost } from "@nestjs/swagger"
import { StatusDTO } from "../dtos/status.dto"

export const STATUS_CRIADO: ApiResponseSchemaHost = {
    status: HttpStatus.CREATED,
    schema: {
        example: true
    },
    description: 'Lista de status criada com sucesso ou não foram necessárias inclusões'
}

export const NAO_PERMITIDO_CADASTRO_DE_MAIS_DE_5_STATUS: ApiResponseSchemaHost = {
    status: HttpStatus.METHOD_NOT_ALLOWED,
    schema: {
        example: {
            message: 'NAO_PERMITIDO_CADASTRO_DE_MAIS_DE_5_STATUS',
            statusCode: HttpStatus.METHOD_NOT_ALLOWED
        },
    },
    description: `Não é permitido o cadastro de mais de cinco status`
}

export const LISTA_STATUS_RETORNADOS: ApiResponseMetadata = {
    status: HttpStatus.OK,
    type: [StatusDTO],
    description: 'Retorno de uma lista de Status'
}

export const NENHUM_STATUS_CADASTRADO: ApiResponseSchemaHost = {
    status: HttpStatus.NOT_FOUND,
    schema: {
        example: {
            message: 'NENHUM_STATUS_CADASTRADO',
            statusCode: HttpStatus.NOT_FOUND
        }
    },
    description: 'Nenhum status cadastrado para o usuário do tipo ONG'
}

export const STATUS_NAO_ENCONTRADO_COM_ID: ApiResponseSchemaHost = {
    status: HttpStatus.NOT_FOUND,
    schema: {
        example: {
            message: 'STATUS_NAO_ENCONTRADO_COM_ID',
            statusCode: HttpStatus.NOT_FOUND
        }
    },
    description: 'Status não encontrado com o id informado'
}

export const STATUS_RETORNADO: ApiResponseMetadata = {
    status: HttpStatus.OK,
    type: StatusDTO,
    description: 'Retorno de um Status'
}

export const STATUS_EXISTENTE_COM_NOME_INFORMADO: ApiResponseSchemaHost = {
    status: HttpStatus.BAD_REQUEST,
    schema: {
        example: {
            message: 'STATUS_EXISTENTE_COM_NOME_INFORMADO',
            statusCode: HttpStatus.BAD_REQUEST
        }
    },
    description: 'Status existente com o nome informado'
}

export const STATUS_EDITADO: ApiResponseSchemaHost = {
    status: HttpStatus.OK,
    schema: {
        example: true
    },
    description: 'Status editado com sucesso'
}

export const STATUS_DELETADO: ApiResponseSchemaHost = {
    status: HttpStatus.OK,
    schema: {
        example: true
    },
    description: 'Status deletado com sucesso'
}