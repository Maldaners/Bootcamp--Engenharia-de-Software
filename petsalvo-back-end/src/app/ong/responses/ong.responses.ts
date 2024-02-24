import { HttpStatus } from "@nestjs/common"
import { ApiResponseMetadata, ApiResponseSchemaHost } from "@nestjs/swagger"
import { ConsultaOngDTO } from "../dto/consulta-ong.dto"

export const ONG_CRIADA: ApiResponseSchemaHost = {
    status: HttpStatus.CREATED,
    schema: {
        example: true
    },
    description: 'ONG criada com sucesso'
}

export const ONG_NAO_ENCONTRADA_COM_ID_DO_USUARIO: ApiResponseSchemaHost = {
    status: HttpStatus.NOT_FOUND,
    schema: {
        example: {
            message: 'ONG_NAO_ENCONTRADA_COM_ID_DO_USUARIO',
            statusCode: HttpStatus.NOT_FOUND
        },
    },
    description: 'ONG não encontrada com o id do usuário informado'
}

export const ONG_NAO_ENCONTRADA_COM_ID_INFORMADO: ApiResponseSchemaHost = {
    status: HttpStatus.NOT_FOUND,
    schema: {
        example: {
            message: 'ONG_NAO_ENCONTRADA_COM_ID_INFORMADO',
            statusCode: HttpStatus.NOT_FOUND
        },
    },
    description: 'ONG não encontrada com o id informado'
}

export const ONG_RETORNADA: ApiResponseMetadata = {
    status: HttpStatus.OK,
    type: ConsultaOngDTO,
    description: 'Retorno de uma ONG'
}

export const LISTA_ONGS_RETORNADAS: ApiResponseMetadata = {
    status: HttpStatus.OK,
    type: [ConsultaOngDTO],
    description: 'Retorno de uma lista de ONGs'
}

export const NENHUMA_ONG_CADASTRADA: ApiResponseSchemaHost = {
    status: HttpStatus.NOT_FOUND,
    schema: {
        example: {
            message: 'NENHUMA_ONG_CADASTRADA',
            statusCode: HttpStatus.NOT_FOUND
        }
    },
    description: 'Nenhum usuário do tipo ONG cadastrado'
}

export const ONG_EDITADA: ApiResponseSchemaHost = {
    status: HttpStatus.OK,
    schema: {
        example: true
    },
    description: 'ONG editada com sucesso'
}

export const ONG_DELETADA: ApiResponseSchemaHost = {
    status: HttpStatus.OK,
    schema: {
        example: true
    },
    description: 'ONG deletada com sucesso'
}