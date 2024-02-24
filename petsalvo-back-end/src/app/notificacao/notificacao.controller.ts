import { Controller, Delete, Get, Inject, Param, ParseBoolPipe, ParseIntPipe, Put, Request } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
//
import { USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO } from "../autenticacao/responses/autenticacao.responses";
import { CODIGOS_VALIDOS_TIPOS_STATUS_PROCESSO_ADOCAO } from "../processo-adocao/enums/tipo-status-processo-adocao.enum";
import { NotificacaoService } from "./notificacao.service";
import { LISTA_NOTIFICACAO_RETORNADA, NENHUMA_NOTIFICACAO_CADASTRADA, NENHUMA_NOTIFICACAO_ENCONTRADA_COM_PARAMETRO_INFORMADO, NOTIFICACAO_DELETADA, NOTIFICACAO_EDITADA, NOTIFICACAO_NAO_ENCONTRADA_COM_ID_INFORMADO, NOTIFICACAO_RETORNADA } from "./responses/notificacao.responses";

@ApiTags('Notificação')
@Controller('notificacao')
export class NotificacaoController {

    constructor(
        @Inject(NotificacaoService) private readonly notificacaoService: NotificacaoService
    ) { }

    @Get('todas')
    @ApiOperation({ summary: 'Retorna uma lista de todas as notificações para o usuário autenticado. Notificações criadas pelo processo de adoção', description: CODIGOS_VALIDOS_TIPOS_STATUS_PROCESSO_ADOCAO })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(NENHUMA_NOTIFICACAO_ENCONTRADA_COM_PARAMETRO_INFORMADO)
    @ApiResponse(LISTA_NOTIFICACAO_RETORNADA)
    public consultarTodas(@Request() req: any) {
        return this.notificacaoService.consultarTodas(req.usuario.idUsuario);
    }

    @Get('todas/visualizadas/:visualizadas')
    @ApiOperation({ summary: 'Retorna uma lista de notificações de acordo com o parâmetro de visualização para o usuário autenticado. Notificações criadas pelo processo de adoção', description: CODIGOS_VALIDOS_TIPOS_STATUS_PROCESSO_ADOCAO })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(NENHUMA_NOTIFICACAO_ENCONTRADA_COM_PARAMETRO_INFORMADO)
    @ApiResponse(LISTA_NOTIFICACAO_RETORNADA)
    public consultarTodasComFiltro(@Request() req: any, @Param('visualizadas', ParseBoolPipe) visualizadas: boolean) {
        return this.notificacaoService.consultarTodasComFiltro(req.usuario.idUsuario, visualizadas);
    }

    @Get('/:idNotificacao')
    @ApiOperation({ summary: 'Retorna uma notificação a partir do seu id para o usuário autenticado. Notificação criada pelo processo de adoção', description: CODIGOS_VALIDOS_TIPOS_STATUS_PROCESSO_ADOCAO })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(NOTIFICACAO_NAO_ENCONTRADA_COM_ID_INFORMADO)
    @ApiResponse(NOTIFICACAO_RETORNADA)
    public consultarPorId(@Request() req: any, @Param('idNotificacao', ParseIntPipe) idNotificacao: number) {
        return this.notificacaoService.consultarPorId(req.usuario.idUsuario, idNotificacao);
    }

    @Put('/:idNotificacao')
    @ApiOperation({ summary: 'Edita uma notificação para a condição de visualizada para o usuário autenticado. Notificação criada pelo processo de adoção', description: CODIGOS_VALIDOS_TIPOS_STATUS_PROCESSO_ADOCAO })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(NOTIFICACAO_NAO_ENCONTRADA_COM_ID_INFORMADO)
    @ApiResponse(NOTIFICACAO_EDITADA)
    public editarNotificacaoParaVisualizada(@Request() req: any, @Param('idNotificacao', ParseIntPipe) idNotificacao: number) {
        return this.notificacaoService.editarParaVisualizada(req.usuario.idUsuario, idNotificacao);
    }

    @Delete('todas')
    @ApiOperation({ summary: 'Deleta todas as notificações para o usuário autenticado. Notificações criadas pelo processo de adoção', description: CODIGOS_VALIDOS_TIPOS_STATUS_PROCESSO_ADOCAO })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(NENHUMA_NOTIFICACAO_CADASTRADA)
    @ApiResponse(NOTIFICACAO_DELETADA)
    public deletarTodas(@Request() req: any) {
        return this.notificacaoService.deletarTodas(req.usuario.idUsuario);
    }

    @Delete('/:idNotificacao')
    @ApiOperation({ summary: 'Deleta uma notificação a partir do seu id para o usuário autenticado. Notificação criada pelo processo de adoção', description: CODIGOS_VALIDOS_TIPOS_STATUS_PROCESSO_ADOCAO })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(NOTIFICACAO_NAO_ENCONTRADA_COM_ID_INFORMADO)
    @ApiResponse(NOTIFICACAO_DELETADA)
    public deletar(@Request() req: any, @Param('idNotificacao', ParseIntPipe) idNotificacao: number) {
        return this.notificacaoService.deletar(req.usuario.idUsuario, idNotificacao);
    }
}