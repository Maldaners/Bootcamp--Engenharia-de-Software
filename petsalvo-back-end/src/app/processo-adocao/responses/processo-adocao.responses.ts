import { HttpStatus } from "@nestjs/common"
import { ApiResponseMetadata, ApiResponseSchemaHost } from "@nestjs/swagger"
import { CODIGOS_VALIDOS_TIPOS_STATUS_PROCESSO_ADOCAO, TipoStatusProcessoAdocao } from "../enums/tipo-status-processo-adocao.enum"
import { ConsultaProcessoAdocaoAdotanteDTO } from "../dto/consulta-processo-adocao-adotante.dto"
import { ConsultaProcessoAdocaoOngDTO } from "../dto/consulta-processo-adocao-ong.dto"

export const PROCESSO_ADOCAO_CRIADO: ApiResponseSchemaHost = {
    status: HttpStatus.CREATED,
    schema: {
        example: true
    },
    description: 'Processo de adoção criado com sucesso'
}

export const ONG_OU_PET_NAO_ENCONTRADOS_COM_OS_IDS_INFORMADOS: ApiResponseSchemaHost = {
    status: HttpStatus.NOT_FOUND,
    schema: {
        example: {
            message: 'ONG_OU_PET_NAO_ENCONTRADOS_COM_OS_IDS_INFORMADOS',
            statusCode: HttpStatus.NOT_FOUND
        }
    },
    description: 'ONG ou pet não encontrados com os ids informados'
}

export const PROCESSO_ADOCAO_NAO_ENCONTRADO_COM_OS_IDS_INFORMADOS: ApiResponseSchemaHost = {
    status: HttpStatus.NOT_FOUND,
    schema: {
        example: {
            message: 'PROCESSO_ADOCAO_NAO_ENCONTRADO_COM_OS_IDS_INFORMADOS',
            statusCode: HttpStatus.NOT_FOUND
        }
    },
    description: 'Processo de adoção não encontrado com os ids informados'
}

export const NAO_PERMITIDO_CRIACAO_DE_MAIS_UM_PROCESSO_ADOCAO_COM_OS_MESMOS_IDS: ApiResponseSchemaHost = {
    status: HttpStatus.METHOD_NOT_ALLOWED,
    schema: {
        example: {
            message: 'NAO_PERMITIDO_CRIACAO_DE_MAIS_UM_PROCESSO_ADOCAO_COM_OS_MESMOS_IDS',
            statusCode: HttpStatus.METHOD_NOT_ALLOWED
        },
    },
    description: `Não é permitida a criação de mais um processo de adoção com os mesmos ids`
}

export const PROCESSO_ADOCAO_ADOTANTE_RETORNADO: ApiResponseMetadata = {
    status: HttpStatus.OK,
    type: ConsultaProcessoAdocaoAdotanteDTO,
    description: 'Retorno de um processo de adoção para o usuário do tipo adotante'
}

export const LISTA_PROCESSO_ADOCAO_ADOTANTE_RETORNADA: ApiResponseMetadata = {
    status: HttpStatus.OK,
    type: [ConsultaProcessoAdocaoAdotanteDTO],
    description: 'Retorno de uma lista de processos de adoção para o usuário do tipo adotante'
}

export const PROCESSO_ADOCAO_ONG_RETORNADO: ApiResponseMetadata = {
    status: HttpStatus.OK,
    type: ConsultaProcessoAdocaoOngDTO,
    description: 'Retorno de um processo de adoção para o usuário do tipo ONG'
}

export const LISTA_PROCESSO_ADOCAO_ONG_RETORNADA: ApiResponseMetadata = {
    status: HttpStatus.CREATED,
    type: [ConsultaProcessoAdocaoOngDTO],
    description: 'Retorno de uma lista de processos de adoção para o usuário do tipo ONG'
}

export const NENHUM_PROCESSO_ADOCAO_CADASTRADO: ApiResponseSchemaHost = {
    status: HttpStatus.NOT_FOUND,
    schema: {
        example: {
            message: 'NENHUM_PROCESSO_ADOCAO_CADASTRADO',
            statusCode: HttpStatus.NOT_FOUND
        }
    },
    description: 'Nenhum processo de adoção cadastrado'
}

export const NENHUM_PROCESSO_ADOCAO_ENCONTRADO_COM_PARAMETROS_INFORMADOS: ApiResponseSchemaHost = {
    status: HttpStatus.NOT_FOUND,
    schema: {
        example: {
            message: 'NENHUM_PROCESSO_ADOCAO_ENCONTRADO_COM_PARAMETROS_INFORMADOS',
            statusCode: HttpStatus.NOT_FOUND
        }
    },
    description: 'NENHUM_PROCESSO_ADOCAO_ENCONTRADO_COM_PARAMETROS_INFORMADOS'
}

export const TIPO_STATUS_PROCESSO_DE_ADOCAO_INVALIDO: ApiResponseSchemaHost = {
    status: HttpStatus.METHOD_NOT_ALLOWED,
    schema: {
        example: {
            message: 'TIPO_STATUS_PROCESSO_DE_ADOCAO_INVALIDO',
            statusCode: HttpStatus.METHOD_NOT_ALLOWED
        },
    },
    description: `O tipo do status do processo de adoção não é válido. <br><br>` + CODIGOS_VALIDOS_TIPOS_STATUS_PROCESSO_ADOCAO
}

export const TIPO_STATUS_PROCESSO_DE_ADOCAO_NAO_PERMITIDO: ApiResponseSchemaHost = {
    status: HttpStatus.METHOD_NOT_ALLOWED,
    schema: {
        example: {
            message: 'TIPO_STATUS_PROCESSO_DE_ADOCAO_NAO_PERMITIDO',
            statusCode: HttpStatus.METHOD_NOT_ALLOWED
        },
    },
    description: `Não é permitido o tipo do status do processo de adoção. <br><br>` + CODIGOS_VALIDOS_TIPOS_STATUS_PROCESSO_ADOCAO
}

export const PROCESSO_ADOCAO_EDITADO: ApiResponseSchemaHost = {
    status: HttpStatus.OK,
    schema: {
        example: true
    },
    description: 'Processo de adoção editado com sucesso'
}

export const TIPO_STATUS_PROCESSO_DE_ADOCAO_DEVE_SER_POR_DESISTENCIA_DO_ADOTANTE_OU_PERFIL_REJEITADO: ApiResponseSchemaHost = {
    status: HttpStatus.METHOD_NOT_ALLOWED,
    schema: {
        example: {
            message: 'TIPO_STATUS_PROCESSO_DE_ADOCAO_DEVE_SER_POR_DESISTENCIA_DO_ADOTANTE_OU_PERFIL_REJEITADO',
            statusCode: HttpStatus.METHOD_NOT_ALLOWED
        },
    },
    description: `A exclusão só é permitida se o status do processo for por desistência do adotante ou que o seu perfil tenha sido rejeitado. <br><br>` + CODIGOS_VALIDOS_TIPOS_STATUS_PROCESSO_ADOCAO
}

export const TIPO_STATUS_PROCESSO_DE_ADOCAO_DEVE_SER_POR_DESISTENCIA_DA_ONG: ApiResponseSchemaHost = {
    status: HttpStatus.METHOD_NOT_ALLOWED,
    schema: {
        example: {
            message: 'TIPO_STATUS_PROCESSO_DE_ADOCAO_DEVE_SER_POR_DESISTENCIA_DA_ONG',
            statusCode: HttpStatus.METHOD_NOT_ALLOWED
        },
    },
    description: `A exclusão só é permitida se o status do processo for por desistência da ONG. <br><br>` + CODIGOS_VALIDOS_TIPOS_STATUS_PROCESSO_ADOCAO
}

export const NAO_PERMITIDA_EXCLUSAO_TIPO_STATUS_PROCESSO_DE_ADOCAO_EM_ANALISE_OU_COM_PERFIL_ACEITO: ApiResponseSchemaHost = {
    status: HttpStatus.METHOD_NOT_ALLOWED,
    schema: {
        example: {
            message: 'NAO_PERMITIDA_EXCLUSAO_TIPO_STATUS_PROCESSO_DE_ADOCAO_EM_ANALISE_OU_COM_PERFIL_ACEITO',
            statusCode: HttpStatus.METHOD_NOT_ALLOWED
        },
    },
    description: `Não é permitida a exclusão de processos de adoção com códigos de status '${TipoStatusProcessoAdocao.EM_ANALISE}' ou '${TipoStatusProcessoAdocao.PERFIL_ACEITO}'. <br><br>` + CODIGOS_VALIDOS_TIPOS_STATUS_PROCESSO_ADOCAO
}

export const NAO_PERMITIDO_EDICAO_PARA_ADOTADO_EM_PROCESSO_ADOCAO_COM_MESMO_PET: ApiResponseSchemaHost = {
    status: HttpStatus.METHOD_NOT_ALLOWED,
    schema: {
        example: {
            message: 'NAO_PERMITIDO_EDICAO_PARA_ADOTADO_EM_PROCESSO_ADOCAO_COM_MESMO_PET',
            statusCode: HttpStatus.METHOD_NOT_ALLOWED
        },
    },
    description: `Não é permitida a edição para o status ${TipoStatusProcessoAdocao.ADOTADO_PELO_USUARIO_AUTENTICADO} para mais de um processo de adoção com um mesmo pet. <br><br>` + CODIGOS_VALIDOS_TIPOS_STATUS_PROCESSO_ADOCAO
}

export const PROCESSO_ADOCAO_EXCLUIDO: ApiResponseSchemaHost = {
    status: HttpStatus.OK,
    schema: {
        example: true
    },
    description: 'Processo de adoção excluído com sucesso'
}