import { HttpStatus } from "@nestjs/common"
import { ApiResponseMetadata, ApiResponseSchemaHost } from "@nestjs/swagger"
import { NotificacaoDTO } from "../dto/notificacao.dto"

export const NOTIFICACAO_CRIADA: ApiResponseSchemaHost = {
    status: HttpStatus.CREATED,
    schema: {
        example: true
    },
    description: 'Notificação criada com sucesso'
}

export const NOTIFICACAO_NAO_ENCONTRADA_COM_ID_INFORMADO: ApiResponseSchemaHost = {
    status: HttpStatus.NOT_FOUND,
    schema: {
        example: {
            message: 'NOTIFICACAO_NAO_ENCONTRADA_COM_ID_INFORMADO',
            statusCode: HttpStatus.NOT_FOUND
        },
    },
    description: 'Notificação não encontrada com o id informado'
}

export const NOTIFICACAO_RETORNADA: ApiResponseMetadata = {
    status: HttpStatus.OK,
    type: NotificacaoDTO,
    description: 'Retorno de uma notificação'
}

export const LISTA_NOTIFICACAO_RETORNADA: ApiResponseMetadata = {
    status: HttpStatus.OK,
    type: [NotificacaoDTO],
    description: 'Retorno de uma lista de notificações'
}

export const NENHUMA_NOTIFICACAO_CADASTRADA: ApiResponseSchemaHost = {
    status: HttpStatus.NOT_FOUND,
    schema: {
        example: {
            message: 'NENHUMA_NOTIFICACAO_CADASTRADA',
            statusCode: HttpStatus.NOT_FOUND
        }
    },
    description: 'Nenhuma notificação cadastrada'
}

export const NENHUMA_NOTIFICACAO_ENCONTRADA_COM_PARAMETRO_INFORMADO: ApiResponseSchemaHost = {
    status: HttpStatus.NOT_FOUND,
    schema: {
        example: {
            message: 'NENHUMA_NOTIFICACAO_ENCONTRADA_COM_PARAMETRO_INFORMADO',
            statusCode: HttpStatus.NOT_FOUND
        }
    },
    description: 'Nenhuma notificação encontrada com o parâmetro informado'
}

export const NOTIFICACAO_EDITADA: ApiResponseSchemaHost = {
    status: HttpStatus.OK,
    schema: {
        example: true
    },
    description: 'Notificação editada com sucesso'
}

export const NOTIFICACAO_DELETADA: ApiResponseSchemaHost = {
    status: HttpStatus.OK,
    schema: {
        example: true
    },
    description: 'Notificação(ões) deletada(s) com sucesso'
}