import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Request } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Roles } from "../autorizacao/decorators/autorizacao.decorator";
import { TipoUsuario } from "../usuario/enum/tipoUsuario.enum";
//
import { ROTA_ADOTANTE } from "../adotante/adotante.controller";
import { USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO } from "../autenticacao/responses/autenticacao.responses";
import { USUARIO_NAO_AUTORIZADO } from "../autorizacao/responses/autorizacao.responses";
import { ROTA_ONG } from "../ong/ong.controller";
import { ROTA_PET } from "../pet/pet.controller";
import { PET_NAO_ENCONTRADO_COM_ID } from "../pet/responses/pet.responses";
import { CODIGOS_VALIDOS_TIPOS_STATUS_PROCESSO_ADOCAO, TipoStatusProcessoAdocao } from "./enums/tipo-status-processo-adocao.enum";
import { ProcessoAdocaoService } from "./processo-adocao.service";
import { LISTA_PROCESSO_ADOCAO_ADOTANTE_RETORNADA, LISTA_PROCESSO_ADOCAO_ONG_RETORNADA, NAO_PERMITIDO_CRIACAO_DE_MAIS_UM_PROCESSO_ADOCAO_COM_OS_MESMOS_IDS, NAO_PERMITIDO_EDICAO_PARA_ADOTADO_EM_PROCESSO_ADOCAO_COM_MESMO_PET, NENHUM_PROCESSO_ADOCAO_CADASTRADO, NENHUM_PROCESSO_ADOCAO_ENCONTRADO_COM_PARAMETROS_INFORMADOS, ONG_OU_PET_NAO_ENCONTRADOS_COM_OS_IDS_INFORMADOS, PROCESSO_ADOCAO_ADOTANTE_RETORNADO, PROCESSO_ADOCAO_CRIADO, PROCESSO_ADOCAO_EDITADO, PROCESSO_ADOCAO_EXCLUIDO, PROCESSO_ADOCAO_NAO_ENCONTRADO_COM_OS_IDS_INFORMADOS, PROCESSO_ADOCAO_ONG_RETORNADO, TIPO_STATUS_PROCESSO_DE_ADOCAO_DEVE_SER_POR_DESISTENCIA_DA_ONG, TIPO_STATUS_PROCESSO_DE_ADOCAO_DEVE_SER_POR_DESISTENCIA_DO_ADOTANTE_OU_PERFIL_REJEITADO, TIPO_STATUS_PROCESSO_DE_ADOCAO_INVALIDO, TIPO_STATUS_PROCESSO_DE_ADOCAO_NAO_PERMITIDO } from "./responses/processo-adocao.responses";
import { FiltroProcessoAdocaoDTO } from "./dto/filtro-processo-adocao.dto";

@ApiTags('Processo de adoção')
@Controller('processo-adocao')
export class ProcessoAdocaoController {

    constructor(
        @Inject(ProcessoAdocaoService) private readonly processoAdocaoService: ProcessoAdocaoService
    ) { }

    //ADOTANTE
    @Post(ROTA_ADOTANTE + '/' + ROTA_ONG + '/:idOng/' + ROTA_PET + '/:idPet')
    @Roles(TipoUsuario.ADMIN, TipoUsuario.ADOTANTE)
    @ApiOperation({ summary: `Cria um processo de adoção com o código do status '${TipoStatusProcessoAdocao.EM_ANALISE}' a partir dos ids de ONG e pet informados para o usuário autenticado do tipo adotante`, description: CODIGOS_VALIDOS_TIPOS_STATUS_PROCESSO_ADOCAO })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(USUARIO_NAO_AUTORIZADO)
    @ApiResponse(ONG_OU_PET_NAO_ENCONTRADOS_COM_OS_IDS_INFORMADOS)
    @ApiResponse(NAO_PERMITIDO_CRIACAO_DE_MAIS_UM_PROCESSO_ADOCAO_COM_OS_MESMOS_IDS)
    @ApiResponse(PROCESSO_ADOCAO_CRIADO)
    public criarParaAdotante(@Request() req: any, @Param('idOng', ParseIntPipe) idOng: number, @Param('idPet', ParseIntPipe) idPet: number) {
        return this.processoAdocaoService.criarParaAdotante(req.usuario.idUsuario, idOng, idPet);
    }

    @Get(ROTA_ADOTANTE + '/' + ROTA_ONG + '/:idOng/' + ROTA_PET + '/:idPet')
    @Roles(TipoUsuario.ADMIN, TipoUsuario.ADOTANTE)
    @ApiOperation({ summary: 'Retorna um processo de adoção a partir dos ids de ONG e pet informados', description: CODIGOS_VALIDOS_TIPOS_STATUS_PROCESSO_ADOCAO })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(USUARIO_NAO_AUTORIZADO)
    @ApiResponse(PROCESSO_ADOCAO_NAO_ENCONTRADO_COM_OS_IDS_INFORMADOS)
    @ApiResponse(PROCESSO_ADOCAO_ADOTANTE_RETORNADO)
    public consultarParaAdotante(@Request() req: any, @Param('idOng', ParseIntPipe) idOng: number, @Param('idPet', ParseIntPipe) idPet: number) {
        return this.processoAdocaoService.consultarPorIdsParaAdotante(req.usuario.idUsuario, idOng, idPet);
    }

    @Get(ROTA_ADOTANTE)
    @Roles(TipoUsuario.ADMIN, TipoUsuario.ADOTANTE)
    @ApiOperation({ summary: 'Retorna uma lista de processos de adoção do usuário autenticado do tipo adotante', description: CODIGOS_VALIDOS_TIPOS_STATUS_PROCESSO_ADOCAO })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(USUARIO_NAO_AUTORIZADO)
    @ApiResponse(NENHUM_PROCESSO_ADOCAO_CADASTRADO)
    @ApiResponse(LISTA_PROCESSO_ADOCAO_ADOTANTE_RETORNADA)
    public consultarTodosParaAdotante(@Request() req: any) {
        return this.processoAdocaoService.consultarTodosParaAdotante(req.usuario.idUsuario);
    }

    @Put('/:idProcessoAdocao/' + ROTA_ADOTANTE + '/tipo-status/desistencia')
    @Roles(TipoUsuario.ADMIN, TipoUsuario.ADOTANTE)
    @ApiOperation({ summary: `Edita um processo de adoção para o código do status '${TipoStatusProcessoAdocao.DESISTENCIA_ADOTANTE}' do usuário autenticado do tipo Adotante`, description: CODIGOS_VALIDOS_TIPOS_STATUS_PROCESSO_ADOCAO })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(USUARIO_NAO_AUTORIZADO)
    @ApiResponse(PROCESSO_ADOCAO_NAO_ENCONTRADO_COM_OS_IDS_INFORMADOS)
    @ApiResponse(PROCESSO_ADOCAO_EDITADO)
    public editarParaAdotanteStatusDesistencia(@Request() req: any, @Param('idProcessoAdocao', ParseIntPipe) idProcessoAdocao: number) {
        return this.processoAdocaoService.editarParaAdotanteStatusDesistencia(req.usuario.idUsuario, idProcessoAdocao);
    }

    @Delete('/:idProcessoAdocao/' + ROTA_ADOTANTE)
    @Roles(TipoUsuario.ADMIN, TipoUsuario.ADOTANTE)
    @ApiOperation({ summary: 'Exclui um processo de adoção do usuário autenticado do tipo adotante. É necessário que seu status seja de desistência por parte do adotante ou tenha o perfil rejeitado' })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(USUARIO_NAO_AUTORIZADO)
    @ApiResponse(PROCESSO_ADOCAO_NAO_ENCONTRADO_COM_OS_IDS_INFORMADOS)
    @ApiResponse(TIPO_STATUS_PROCESSO_DE_ADOCAO_DEVE_SER_POR_DESISTENCIA_DO_ADOTANTE_OU_PERFIL_REJEITADO)
    @ApiResponse(PROCESSO_ADOCAO_EXCLUIDO)
    public deletarParaAdotante(@Request() req: any, @Param('idProcessoAdocao', ParseIntPipe) idProcessoAdocao: number) {
        return this.processoAdocaoService.deletarParaAdotante(req.usuario.idUsuario, idProcessoAdocao);
    }
    //

    //ONG
    @Get(ROTA_ONG + '/' + ROTA_ADOTANTE + '/:idAdotante/' + ROTA_PET + '/:idPet')
    @Roles(TipoUsuario.ADMIN, TipoUsuario.ONG)
    @ApiOperation({ summary: 'Retorna um processo de adoção a partir dos ids de adotante e pet informados', description: CODIGOS_VALIDOS_TIPOS_STATUS_PROCESSO_ADOCAO })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(USUARIO_NAO_AUTORIZADO)
    @ApiResponse(PROCESSO_ADOCAO_NAO_ENCONTRADO_COM_OS_IDS_INFORMADOS)
    @ApiResponse(PROCESSO_ADOCAO_ONG_RETORNADO)
    public consultarParaOng(@Request() req: any, @Param('idAdotante', ParseIntPipe) idAdotante: number, @Param('idPet', ParseIntPipe) idPet: number) {
        return this.processoAdocaoService.consultarPorIdsParaOng(req.usuario.idUsuario, idAdotante, idPet);
    }

    @Post(ROTA_ONG + "/" + ROTA_PET + "/:idPet")
    @Roles(TipoUsuario.ADMIN, TipoUsuario.ONG)
    @ApiOperation({ summary: 'Retorna uma lista de processos de adoção do usuário autenticado do tipo ONG a partir do id do pet e do filtro por tipo de status. Se o filtro for vazio ou não informado no body temos o retorno de todos os processos de adoção', description: CODIGOS_VALIDOS_TIPOS_STATUS_PROCESSO_ADOCAO })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(USUARIO_NAO_AUTORIZADO)
    @ApiResponse(PET_NAO_ENCONTRADO_COM_ID)
    @ApiResponse(TIPO_STATUS_PROCESSO_DE_ADOCAO_INVALIDO)
    @ApiResponse(NENHUM_PROCESSO_ADOCAO_ENCONTRADO_COM_PARAMETROS_INFORMADOS)
    @ApiResponse(LISTA_PROCESSO_ADOCAO_ONG_RETORNADA)
    public consultarTodosParaOngEPet(@Request() req: any, @Param('idPet', ParseIntPipe) idPet: number,  @Body() body: FiltroProcessoAdocaoDTO) {
        return this.processoAdocaoService.consultarTodosParaOngEPet(req.usuario.idUsuario, idPet, body);
    }
    
    @Get(ROTA_ONG)
    @Roles(TipoUsuario.ADMIN, TipoUsuario.ONG)
    @ApiOperation({ summary: 'Retorna uma lista de processos de adoção do usuário autenticado do tipo ONG', description: CODIGOS_VALIDOS_TIPOS_STATUS_PROCESSO_ADOCAO })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(USUARIO_NAO_AUTORIZADO)
    @ApiResponse(NENHUM_PROCESSO_ADOCAO_CADASTRADO)
    @ApiResponse(LISTA_PROCESSO_ADOCAO_ONG_RETORNADA)
    public consultarTodosParaOng(@Request() req: any) {
        return this.processoAdocaoService.consultarTodosParaOng(req.usuario.idUsuario);
    }

    @Put('/:idProcessoAdocao/' + ROTA_ONG + '/tipo-status/:tipoStatus')
    @Roles(TipoUsuario.ADMIN, TipoUsuario.ONG)
    @ApiOperation({ summary: 'Edita um processo de adoção do usuário autenticado do tipo ONG', description: CODIGOS_VALIDOS_TIPOS_STATUS_PROCESSO_ADOCAO })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(USUARIO_NAO_AUTORIZADO)
    @ApiResponse(PROCESSO_ADOCAO_NAO_ENCONTRADO_COM_OS_IDS_INFORMADOS)
    @ApiResponse(TIPO_STATUS_PROCESSO_DE_ADOCAO_INVALIDO)
    @ApiResponse(TIPO_STATUS_PROCESSO_DE_ADOCAO_NAO_PERMITIDO)
    @ApiResponse(NAO_PERMITIDO_EDICAO_PARA_ADOTADO_EM_PROCESSO_ADOCAO_COM_MESMO_PET)
    @ApiResponse(PROCESSO_ADOCAO_EDITADO)
    public editarParaOng(@Request() req: any, @Param('idProcessoAdocao', ParseIntPipe) idProcessoAdocao: number, @Param('tipoStatus', ParseIntPipe) tipoStatus: TipoStatusProcessoAdocao) {
        return this.processoAdocaoService.editarParaOng(req.usuario.idUsuario, idProcessoAdocao, tipoStatus);
    }

    @Delete('/:idProcessoAdocao/' + ROTA_ONG)
    @Roles(TipoUsuario.ADMIN, TipoUsuario.ONG)
    @ApiOperation({ summary: 'Exclui um processo de adoção do usuário autenticado do tipo ONG. É necessário que seu status seja de desistência por parte da ONG' })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(USUARIO_NAO_AUTORIZADO)
    @ApiResponse(PROCESSO_ADOCAO_NAO_ENCONTRADO_COM_OS_IDS_INFORMADOS)
    @ApiResponse(TIPO_STATUS_PROCESSO_DE_ADOCAO_DEVE_SER_POR_DESISTENCIA_DA_ONG)
    @ApiResponse(PROCESSO_ADOCAO_EXCLUIDO)
    public deletarParaOng(@Request() req: any, @Param('idProcessoAdocao', ParseIntPipe) idProcessoAdocao: number) {
        return this.processoAdocaoService.deletarParaOng(req.usuario.idUsuario, idProcessoAdocao);
    }
    //
}