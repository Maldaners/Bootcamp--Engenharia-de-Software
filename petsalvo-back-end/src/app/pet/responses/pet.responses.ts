import { HttpStatus } from "@nestjs/common"
import { ApiResponseMetadata, ApiResponseSchemaHost } from "@nestjs/swagger"
import { ConsultaPetOngDTO } from "../dto/consulta-pet-ong.dto"
import { CriaPetDTO } from "../dto/cria-pet.dto"
import { CODIGOS_VALIDOS_SEXO_PET } from "../enum/sexo-pet.enum"
import { CODIGOS_VALIDOS_TIPOS_PETS } from "../enum/tipo-pet.enum"

export const PET_CRIADO: ApiResponseMetadata = {
    status: HttpStatus.CREATED,
    type: CriaPetDTO,
    description: 'Pet criado com sucesso'
}

export const VALOR_TIPO_PET_INVALIDO: ApiResponseSchemaHost = {
    status: HttpStatus.BAD_REQUEST,
    schema: {
        example: {
            message: 'VALOR_TIPO_PET_INVALIDO',
            statusCode: HttpStatus.BAD_REQUEST
        },
    },
    description: `O tipo do pet não é válido. <br><br>` + CODIGOS_VALIDOS_TIPOS_PETS
}

export const VALOR_SEXO_PET_INVALIDO: ApiResponseSchemaHost = {
    status: HttpStatus.METHOD_NOT_ALLOWED,
    schema: {
        example: {
            message: 'VALOR_SEXO_PET_INVALIDO',
            statusCode: HttpStatus.METHOD_NOT_ALLOWED
        }
    },
    description: `O valor para o sexo não é permitido. <br><br>` + CODIGOS_VALIDOS_SEXO_PET
}

export const PET_NAO_ENCONTRADO_COM_ID: ApiResponseSchemaHost = {
    status: HttpStatus.NOT_FOUND,
    schema: {
        example: {
            message: 'PET_NAO_ENCONTRADO_COM_ID',
            statusCode: HttpStatus.NOT_FOUND
        }
    },
    description: 'Pet não encontrado com o id informado'
}

export const PET_RETORNADO: ApiResponseMetadata = {
    status: HttpStatus.OK,
    type: ConsultaPetOngDTO,
    description: 'Retorno de um pet'
}

export const LISTA_PET_RETORNADO: ApiResponseMetadata = {
    status: HttpStatus.OK,
    type: [ConsultaPetOngDTO],
    description: 'Retorno de uma lista de pets'
}

export const NENHUM_PET_NAO_ADOTADO_CADASTRADO: ApiResponseSchemaHost = {
    status: HttpStatus.NOT_FOUND,
    schema: {
        example: {
            message: 'NENHUM_PET_NAO_ADOTADO_CADASTRADO',
            statusCode: HttpStatus.NOT_FOUND
        }
    },
    description: 'Nenhum pet não adotado cadastrado'
}

export const NENHUM_PET_CADASTRADO_PARA_ESTA_ONG: ApiResponseSchemaHost = {
    status: HttpStatus.NOT_FOUND,
    schema: {
        example: {
            message: 'NENHUM_PET_CADASTRADO_PARA_ESTA_ONG',
            statusCode: HttpStatus.NOT_FOUND
        }
    },
    description: 'Nenhum pet cadastrado para esta ONG'
}

export const PET_EDITADO: ApiResponseSchemaHost = {
    status: HttpStatus.OK,
    schema: {
        example: true
    },
    description: 'Pet editado com sucesso'
}

export const PET_DELETADO: ApiResponseSchemaHost = {
    status: HttpStatus.OK,
    schema: {
        example: true
    },
    description: 'Pet deletado com sucesso'
}