import { HttpStatus } from "@nestjs/common"
import { ApiResponseMetadata, ApiResponseSchemaHost } from "@nestjs/swagger"
import { ImagemDTO } from "../../dto/imagem.dto"

export const IMAGEM_ADICIONADA: ApiResponseSchemaHost = {
    status: HttpStatus.CREATED,
    schema: {
        example: true
    },
    description: 'Imagem do usuário adicionada com sucesso'
}

export const IMAGEM_RETORNADA: ApiResponseMetadata = {
    status: HttpStatus.CREATED,
    type: ImagemDTO,
    description: 'Retorno da URL da imagem do usuário'
}

export const IMAGEM_DELETADA: ApiResponseSchemaHost = {
    status: HttpStatus.OK,
    schema: {
        example: true
    },
    description: 'Imagem do usuário deletada com sucesso'
}

export const IMAGEM_NAO_ENCONTRADA_PARA_O_TIPO_E_ID_DO_USUARIO: ApiResponseSchemaHost = {
    status: HttpStatus.NOT_FOUND,
    schema: {
        example: {
            message: 'IMAGEM_NAO_ENCONTRADA_PARA_O_TIPO_E_ID_DO_USUARIO',
            statusCode: HttpStatus.NOT_FOUND
        },
    },
    description: 'Imagem não encontrada para o tipo e id do usuário informado'
}