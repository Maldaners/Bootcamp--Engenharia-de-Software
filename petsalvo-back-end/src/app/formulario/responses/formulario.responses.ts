import { HttpStatus } from "@nestjs/common"
import { ApiResponseMetadata, ApiResponseSchemaHost } from "@nestjs/swagger"
import { FormularioDTO } from "../dtos/formulario-padrao/formulario.dto"
import { FormularioRespostaAdotanteDTO } from "../dtos/formulario-resposta-adotante.dto"

export const FORMULARIO_RETORNADO: ApiResponseMetadata = {
    status: HttpStatus.OK,
    type: [FormularioDTO],
    description: 'Retorno do formulário padrão'
}

export const FORMULARIO_PADRAO_NAO_ENCONTRADO: ApiResponseSchemaHost = {
    status: HttpStatus.NOT_FOUND,
    schema: {
        example: {
            message: 'FORMULARIO_PADRAO_NAO_ENCONTRADO',
            statusCode: HttpStatus.NOT_FOUND
        }
    },
    description: 'Formulário padrão não encontrado'
}

export const FORMULARIO_RESPOSTA_RETORNADO: ApiResponseMetadata = {
    status: HttpStatus.OK,
    type: [FormularioRespostaAdotanteDTO],
    description: 'Retorno das respostas do formulário do adotante'
}

export const UMA_OU_MAIS_RESPOSTAS_NAO_ENCONTRADAS_COM_ID_INFORMADO: ApiResponseSchemaHost = {
    status: HttpStatus.NOT_FOUND,
    schema: {
        example: {
            message: 'UMA_OU_MAIS_RESPOSTAS_NAO_ENCONTRADAS_COM_ID_INFORMADO',
            statusCode: HttpStatus.NOT_FOUND
        }
    },
    description: 'Uma ou mais respostas não foram encontradas com o id informado'
}

export const RESPOSTA_REPETIDA_OU_EXISTENTE_PARA_A_PERGUNTA: ApiResponseSchemaHost = {
    status: HttpStatus.METHOD_NOT_ALLOWED,
    schema: {
        example: {
            message: 'RESPOSTA_REPETIDA_OU_EXISTENTE_PARA_A_PERGUNTA',
            statusCode: HttpStatus.METHOD_NOT_ALLOWED
        }
    },
    description: 'Resposta repetida ou já existente para a pergunta'
}

export const RESPOSTA_PERTENCE_A_OUTRA_PERGUNTA: ApiResponseSchemaHost = {
    status: HttpStatus.METHOD_NOT_ALLOWED,
    schema: {
        example: {
            message: 'RESPOSTA_PERTENCE_A_OUTRA_PERGUNTA',
            statusCode: HttpStatus.METHOD_NOT_ALLOWED
        }
    },
    description: 'Resposta não permitida para a pergunta. A resposta pertence a outra pergunta'
}

export const FORMULARIO_ADOTANTE_CRIADO: ApiResponseSchemaHost = {
    status: HttpStatus.CREATED,
    schema: {
        example: true
    },
    description: 'Lista de respostas cadastradas com sucesso'
}

export const FORMULARIO_ADOTANTE_EDITADO: ApiResponseSchemaHost = {
    status: HttpStatus.OK,
    schema: {
        example: true
    },
    description: 'Lista de respostas editadas com sucesso'
}

export const FORMULARIO_ADOTANTE_DELETADO: ApiResponseSchemaHost = {
    status: HttpStatus.OK,
    schema: {
        example: true
    },
    description: 'Todas as respostas deletadas com sucesso'
}

export const FORMULARIO_ADOTANTE_NAO_ENCONTRADO: ApiResponseSchemaHost = {
    status: HttpStatus.NOT_FOUND,
    schema: {
        example: {
            message: 'FORMULARIO_ADOTANTE_NAO_ENCONTRADO',
            statusCode: HttpStatus.NOT_FOUND
        }
    },
    description: 'Formulário do adotante não encontrado'
}