import { HttpStatus } from "@nestjs/common"
import { ApiResponseMetadata, ApiResponseSchemaHost } from "@nestjs/swagger"
import { ImagemDTO } from "../../dto/imagem.dto"

export const IMAGEM_PET_ADICIONADA: ApiResponseSchemaHost = {
    status: HttpStatus.CREATED,
    schema: {
        example: true
    },
    description: 'Lista de imagens do pet adicionada com sucesso'
}

export const IMAGEM_PET_RETORNADA: ApiResponseMetadata = {
    status: HttpStatus.OK,
    type: ImagemDTO,
    description: 'Retorno da URL da imagem do pet'
}

export const LISTA_IMAGEM_PET_RETORNADA: ApiResponseMetadata = {
    status: HttpStatus.OK,
    type: [ImagemDTO],
    description: 'Retorno da lista de URLs das imagens do pet'
}

export const IMAGEM_PET_DELETADA: ApiResponseSchemaHost = {
    status: HttpStatus.OK,
    schema: {
        example: true
    },
    description: 'Imagem do pet deletada com sucesso'
}

export const IMAGEM_NAO_ENCONTRADA_COM_ID_DO_PET_OU_ID_DA_IMAGEM: ApiResponseSchemaHost = {
    status: HttpStatus.NOT_FOUND,
    schema: {
        example: {
            message: 'IMAGEM_NAO_ENCONTRADA_COM_ID_DO_PET_OU_ID_DA_IMAGEM',
            statusCode: HttpStatus.NOT_FOUND
        },
    },
    description: 'Imagem não encontrada com o id do pet ou id da imagem informados'
}

export const NENHUMA_IMAGEM_ENCONTRADA_COM_ID_DO_PET: ApiResponseSchemaHost = {
    status: HttpStatus.NOT_FOUND,
    schema: {
        example: {
            message: 'NENHUMA_IMAGEM_ENCONTRADA_COM_ID_DO_PET',
            statusCode: HttpStatus.NOT_FOUND
        },
    },
    description: 'Nenhuma imagem encontrada com o id do pet informado'
}