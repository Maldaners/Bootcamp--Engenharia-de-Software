import { HttpStatus } from "@nestjs/common"
import { ApiResponseMetadata, ApiResponseSchemaHost } from "@nestjs/swagger"
import { PixDTO } from "../dtos/pix.dto"
import { CODIGOS_VALIDOS_TIPOS_CHAVES_PIX } from "../enum/tipo-chave.enum"

export const CHAVE_PIX_CRIADA: ApiResponseSchemaHost = {
    status: HttpStatus.CREATED,
    schema: {
        example: true
    },
    description: 'Lista de chaves Pix criada com sucesso ou não foram necessárias inclusões'
}

export const NAO_PERMITIDO_CADASTRO_DE_MAIS_DE_5_CHAVES_PIX: ApiResponseSchemaHost = {
    status: HttpStatus.METHOD_NOT_ALLOWED,
    schema: {
        example: {
            message: 'NAO_PERMITIDO_CADASTRO_DE_MAIS_DE_5_CHAVES_PIX',
            statusCode: HttpStatus.METHOD_NOT_ALLOWED
        },
    },
    description: `Não é permitido o cadastro de mais de cinco chaves Pix`
}

export const LISTA_CHAVES_PIX_RETORNADAS: ApiResponseMetadata = {
    status: HttpStatus.OK,
    type: [PixDTO],
    description: 'Retorno de uma lista de chaves Pix'
}

export const NENHUMA_CHAVE_PIX_CADASTRADA: ApiResponseSchemaHost = {
    status: HttpStatus.NOT_FOUND,
    schema: {
        example: {
            message: 'NENHUMA_CHAVE_PIX_CADASTRADA',
            statusCode: HttpStatus.NOT_FOUND
        }
    },
    description: 'Nenhuma chave Pix cadastrada para o usuário do tipo ONG'
}

export const CHAVE_PIX_NAO_ENCONTRADA_COM_ID: ApiResponseSchemaHost = {
    status: HttpStatus.NOT_FOUND,
    schema: {
        example: {
            message: 'CHAVE_PIX_NAO_ENCONTRADA_COM_ID',
            statusCode: HttpStatus.NOT_FOUND
        }
    },
    description: 'Chave Pix não encontrada com o id informado'
}

export const CHAVE_PIX_RETORNADA: ApiResponseMetadata = {
    status: HttpStatus.OK,
    type: PixDTO,
    description: 'Retorno de uma chave Pix'
}

export const CHAVE_PIX_EXISTENTE_COM_TIPO_E_NOME_INFORMADOS: ApiResponseSchemaHost = {
    status: HttpStatus.METHOD_NOT_ALLOWED,
    schema: {
        example: {
            message: 'CHAVE_PIX_EXISTENTE_COM_TIPO_E_NOME_INFORMADOS',
            statusCode: HttpStatus.METHOD_NOT_ALLOWED
        }
    },
    description: 'Chave Pix existente com o tipo e nome informados'
}

export const CHAVE_PIX_EDITADA: ApiResponseSchemaHost = {
    status: HttpStatus.OK,
    schema: {
        example: true
    },
    description: 'Chave pix editada com sucesso'
}

export const CHAVE_PIX_DELETADA: ApiResponseSchemaHost = {
    status: HttpStatus.OK,
    schema: {
        example: true
    },
    description: 'Chave Pix deletada com sucesso'
}

export const TIPO_DA_CHAVE_PIX_INVALIDA: ApiResponseSchemaHost = {
    status: HttpStatus.BAD_REQUEST,
    schema: {
        example: {
            message: 'TIPO_DA_CHAVE_PIX_INVALIDA',
            statusCode: HttpStatus.BAD_REQUEST
        },
    },
    description: `O tipo da chave Pix não é válido. <br><br>` + CODIGOS_VALIDOS_TIPOS_CHAVES_PIX
}