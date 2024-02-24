import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Request } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO } from "../autenticacao/responses/autenticacao.responses";
import { Roles } from "../autorizacao/decorators/autorizacao.decorator";
import { USUARIO_NAO_AUTORIZADO } from "../autorizacao/responses/autorizacao.responses";
import { ROTA_ONG, TAG_ONG } from "../ong/ong.controller";
import { TipoUsuario } from "../usuario/enum/tipoUsuario.enum";
import { EditaStatusDTO } from "./dtos/edita-status.dto";
import { StatusDTO } from "./dtos/status.dto";
import { LISTA_STATUS_RETORNADOS, NAO_PERMITIDO_CADASTRO_DE_MAIS_DE_5_STATUS, NENHUM_STATUS_CADASTRADO, STATUS_CRIADO, STATUS_DELETADO, STATUS_EDITADO, STATUS_NAO_ENCONTRADO_COM_ID, STATUS_RETORNADO } from "./responses/status.responses";
import { StatusService } from "./status.service";
import { ROTA_USUARIO } from "../usuario/usuario.controller";

const ROTA_STATUS = 'status';

@ApiTags(TAG_ONG)
@Controller(ROTA_ONG)
export class StatusController {

    constructor(
        private readonly statusService: StatusService
    ) { }

    @Post(ROTA_STATUS)
    @Roles(TipoUsuario.ADMIN, TipoUsuario.ONG)
    @ApiBody({ type: [StatusDTO] })
    @ApiOperation({ summary: 'Cria uma lista de até 5 status para o usuário autenticado do tipo ONG. Status já existentes serão desconsiderados' })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(USUARIO_NAO_AUTORIZADO)
    @ApiResponse(NAO_PERMITIDO_CADASTRO_DE_MAIS_DE_5_STATUS)
    @ApiResponse(STATUS_CRIADO)
    public criarStatus(@Request() req: any, @Body() body: StatusDTO[]) {
        return this.statusService.criar(req.usuario.idUsuario, body);
    }

    @Get(ROTA_STATUS)
    @Roles(TipoUsuario.ADMIN, TipoUsuario.ONG)
    @ApiOperation({ summary: 'Retorna uma lista de status do usuário autenticado do tipo ONG' })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(USUARIO_NAO_AUTORIZADO)
    @ApiResponse(NENHUM_STATUS_CADASTRADO)
    @ApiResponse(LISTA_STATUS_RETORNADOS)
    public consultarTodosStatus(@Request() req: any) {
        return this.statusService.consultarTodos(req.usuario.idUsuario);
    }

    @Get(ROTA_USUARIO + '/:idUsuario/' + ROTA_STATUS)
    @ApiOperation({ summary: 'Retorna uma lista de status do usuário do tipo ONG a partir do id do usuário informado' })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(USUARIO_NAO_AUTORIZADO)
    @ApiResponse(NENHUM_STATUS_CADASTRADO)
    @ApiResponse(LISTA_STATUS_RETORNADOS)
    public consultarTodosStatusPorIdUsuario(@Param('idUsuario', ParseIntPipe) idUsuario: number) {
        return this.statusService.consultarTodos(idUsuario);
    }

    @Get(ROTA_STATUS + '/:idStatus')
    @Roles(TipoUsuario.ADMIN, TipoUsuario.ONG)
    @ApiOperation({ summary: 'Retorna um status a partir do seu id para o usuário autenticado do tipo ONG' })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(USUARIO_NAO_AUTORIZADO)
    @ApiResponse(STATUS_NAO_ENCONTRADO_COM_ID)
    @ApiResponse(STATUS_RETORNADO)
    public consultarStatus(@Request() req: any, @Param('idStatus', ParseIntPipe) idStatus: number) {
        return this.statusService.consultarPorId(req.usuario.idUsuario, idStatus);
    }   

    @Get(ROTA_USUARIO + '/:idUsuario/' + ROTA_STATUS + '/:idStatus')
    @ApiOperation({ summary: 'Retorna um status a partir dos ids do usuário do tipo ONG e do status informados' })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(USUARIO_NAO_AUTORIZADO)
    @ApiResponse(STATUS_NAO_ENCONTRADO_COM_ID)
    @ApiResponse(STATUS_RETORNADO)
    public consultarStatusPorIdUsuario(@Param('idUsuario', ParseIntPipe) idUsuario: number, @Param('idStatus', ParseIntPipe) idStatus: number) {
        return this.statusService.consultarPorId(idUsuario, idStatus);
    }

    @Put(ROTA_STATUS + '/:idStatus')
    @Roles(TipoUsuario.ADMIN, TipoUsuario.ONG)
    @ApiOperation({ summary: 'Edita um status a partir do seu id para o usuário autenticado do tipo ONG' })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(USUARIO_NAO_AUTORIZADO)
    @ApiResponse(STATUS_NAO_ENCONTRADO_COM_ID)
    @ApiResponse(STATUS_EDITADO)
    public editarStatus(@Request() req: any, @Param('idStatus', ParseIntPipe) idStatus: number, @Body() body: StatusDTO) {
        return this.statusService.editar(req.usuario.idUsuario, idStatus, body);
    }

    @Put(ROTA_STATUS)
    @Roles(TipoUsuario.ADMIN, TipoUsuario.ONG)
    @ApiBody({ type: [EditaStatusDTO] })
    @ApiOperation({ summary: 'Edita uma lista de status para o usuário autenticado do tipo ONG. Status com nomes já existentes serão considerados uma única vez' })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(USUARIO_NAO_AUTORIZADO)
    @ApiResponse(STATUS_NAO_ENCONTRADO_COM_ID)
    @ApiResponse(STATUS_EDITADO)
    public editarListaStatus(@Request() req: any, @Body() body: EditaStatusDTO[]) {
        return this.statusService.editarLista(req.usuario.idUsuario, body);
    }

    @Delete(ROTA_STATUS + '/:idStatus')
    @Roles(TipoUsuario.ADMIN, TipoUsuario.ONG)
    @ApiOperation({ summary: 'Deleta um status a partir do seu id para o usuário autenticado do tipo ONG' })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(USUARIO_NAO_AUTORIZADO)
    @ApiResponse(STATUS_NAO_ENCONTRADO_COM_ID)
    @ApiResponse(STATUS_DELETADO)
    public deletarStatus(@Request() req: any, @Param('idStatus', ParseIntPipe) idStatus: number) {
        return this.statusService.deletar(req.usuario.idUsuario, idStatus);
    }
}