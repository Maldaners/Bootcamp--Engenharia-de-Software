import { HttpStatus } from "@nestjs/common"
import { ApiResponseMetadata, ApiResponseSchemaHost } from "@nestjs/swagger"
import { ConsultaAdotanteDTO } from "../dto/consulta-adotante.dto"

export const ADOTANTE_CRIADO: ApiResponseSchemaHost = {
    status: HttpStatus.CREATED,
    schema: {
        example: true
    },
    description: 'Adotante criado com sucesso'
}

export const ADOTANTE_NAO_ENCONTRADO_COM_ID_DO_USUARIO: ApiResponseSchemaHost = {
    status: HttpStatus.NOT_FOUND,
    schema: {
        example: {
            message: 'ADOTANTE_NAO_ENCONTRADO_COM_ID_DO_USUARIO',
            statusCode: HttpStatus.NOT_FOUND
        },
    },
    description: 'Adotante não encontrado com o id do usuário informado'
}

export const ADOTANTE_NAO_ENCONTRADO_COM_ID_INFORMADO: ApiResponseSchemaHost = {
    status: HttpStatus.NOT_FOUND,
    schema: {
        example: {
            message: 'ADOTANTE_NAO_ENCONTRADO_COM_ID_INFORMADO',
            statusCode: HttpStatus.NOT_FOUND
        },
    },
    description: 'Adotante não encontrado com o id informado'
}

export const ADOTANTE_RETORNADO: ApiResponseMetadata = {
    status: HttpStatus.OK,
    type: ConsultaAdotanteDTO,
    description: 'Retorno de um adotante'
}

export const LISTA_ADOTANTES_RETORNADOS: ApiResponseMetadata = {
    status: HttpStatus.OK,
    type: [ConsultaAdotanteDTO],
    description: 'Retorno de uma lista de adotantes'
}

export const NENHUM_ADOTANTE_CADASTRADO: ApiResponseSchemaHost = {
    status: HttpStatus.NOT_FOUND,
    schema: {
        example: {
            message: 'NENHUM_ADOTANTE_CADASTRADO',
            statusCode: HttpStatus.NOT_FOUND
        }
    },
    description: 'Nenhum usuário do tipo adotante cadastrado'
}

export const ADOTANTE_EDITADO: ApiResponseSchemaHost = {
    status: HttpStatus.OK,
    schema: {
        example: true
    },
    description: 'Adotante editado com sucesso'
}

export const ADOTANTE_DELETADO: ApiResponseSchemaHost = {
    status: HttpStatus.OK,
    schema: {
        example: true
    },
    description: 'Adotante deletado com sucesso'
}