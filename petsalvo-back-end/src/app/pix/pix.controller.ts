import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Request } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO } from "../autenticacao/responses/autenticacao.responses";
import { Roles } from "../autorizacao/decorators/autorizacao.decorator";
import { USUARIO_NAO_AUTORIZADO } from "../autorizacao/responses/autorizacao.responses";
import { ROTA_ONG, TAG_ONG } from "../ong/ong.controller";
import { TipoUsuario } from "../usuario/enum/tipoUsuario.enum";
import { EditaPixDTO } from "./dtos/edita-pix.dto";
import { PixDTO } from "./dtos/pix.dto";
import { CODIGOS_VALIDOS_TIPOS_CHAVES_PIX } from "./enum/tipo-chave.enum";
import { PixService } from "./pix.service";
import { CHAVE_PIX_CRIADA, CHAVE_PIX_DELETADA, CHAVE_PIX_EDITADA, CHAVE_PIX_EXISTENTE_COM_TIPO_E_NOME_INFORMADOS, CHAVE_PIX_NAO_ENCONTRADA_COM_ID, CHAVE_PIX_RETORNADA, LISTA_CHAVES_PIX_RETORNADAS, NAO_PERMITIDO_CADASTRO_DE_MAIS_DE_5_CHAVES_PIX, NENHUMA_CHAVE_PIX_CADASTRADA, TIPO_DA_CHAVE_PIX_INVALIDA } from "./responses/pix.responses";
import { ROTA_USUARIO } from "../usuario/usuario.controller";

const ROTA_PIX = 'pix';

@ApiTags(TAG_ONG)
@Controller(ROTA_ONG)
export class PixController {

    constructor(
        private readonly pixService: PixService
    ) { }

    @Post(ROTA_PIX)
    @Roles(TipoUsuario.ADMIN, TipoUsuario.ONG)
    @ApiBody({ type: [PixDTO] })
    @ApiOperation({ summary: 'Cria uma lista de até 5 chaves Pix para o usuário autenticado do tipo ONG. Chaves Pix do mesmo tipo e valor já existentes serão desconsideradas.', description: CODIGOS_VALIDOS_TIPOS_CHAVES_PIX })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(USUARIO_NAO_AUTORIZADO)
    @ApiResponse(NAO_PERMITIDO_CADASTRO_DE_MAIS_DE_5_CHAVES_PIX)
    @ApiResponse(TIPO_DA_CHAVE_PIX_INVALIDA)
    @ApiResponse(CHAVE_PIX_CRIADA)
    public criarChavePix(@Request() req: any, @Body() body: PixDTO[]) {
        return this.pixService.criar(req.usuario.idUsuario, body);
    }

    @Get(ROTA_PIX)
    @Roles(TipoUsuario.ADMIN, TipoUsuario.ONG)
    @ApiOperation({ summary: 'Retorna uma lista de chaves Pix do usuário autenticado do tipo ONG', description: CODIGOS_VALIDOS_TIPOS_CHAVES_PIX })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(USUARIO_NAO_AUTORIZADO)
    @ApiResponse(NENHUMA_CHAVE_PIX_CADASTRADA)
    @ApiResponse(LISTA_CHAVES_PIX_RETORNADAS)
    public consultarTodasChavesPix(@Request() req: any) {
        return this.pixService.consultarTodos(req.usuario.idUsuario);
    }

    @Get(ROTA_USUARIO + '/:idUsuario/' + ROTA_PIX)
    @ApiOperation({ summary: 'Retorna uma lista de chaves Pix do usuário do tipo ONG a partir do id do usuário informado', description: CODIGOS_VALIDOS_TIPOS_CHAVES_PIX })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(USUARIO_NAO_AUTORIZADO)
    @ApiResponse(NENHUMA_CHAVE_PIX_CADASTRADA)
    @ApiResponse(LISTA_CHAVES_PIX_RETORNADAS)
    public consultarTodasChavesPixPorIdUsuario(@Param('idUsuario', ParseIntPipe) idUsuario: number) {
        return this.pixService.consultarTodos(idUsuario);
    }

    @Get(ROTA_PIX + '/:idPix')
    @Roles(TipoUsuario.ADMIN, TipoUsuario.ONG)
    @ApiOperation({ summary: 'Retorna uma chave Pix a partir do seu id para o usuário autenticado do tipo ONG', description: CODIGOS_VALIDOS_TIPOS_CHAVES_PIX })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(USUARIO_NAO_AUTORIZADO)
    @ApiResponse(CHAVE_PIX_NAO_ENCONTRADA_COM_ID)
    @ApiResponse(CHAVE_PIX_RETORNADA)
    public consultarChavePix(@Request() req: any, @Param('idPix', ParseIntPipe) idPix: number) {
        return this.pixService.consultarPorId(req.usuario.idUsuario, idPix);
    }

    @Get(ROTA_USUARIO + '/:idUsuario/' + ROTA_PIX + '/:idPix')
    @ApiOperation({ summary: 'Retorna uma chave Pix a partir dos ids do usuário do tipo ONG e da chave Pix informados', description: CODIGOS_VALIDOS_TIPOS_CHAVES_PIX })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(USUARIO_NAO_AUTORIZADO)
    @ApiResponse(CHAVE_PIX_NAO_ENCONTRADA_COM_ID)
    @ApiResponse(CHAVE_PIX_RETORNADA)
    public consultarChavePixPorIdUsuario(@Param('idUsuario', ParseIntPipe) idUsuario: number, @Param('idPix', ParseIntPipe) idPix: number) {
        return this.pixService.consultarPorId(idUsuario, idPix);
    }

    @Put(ROTA_PIX + '/:idPix')
    @Roles(TipoUsuario.ADMIN, TipoUsuario.ONG)
    @ApiOperation({ summary: 'Edita uma chave Pix a partir do seu id para o usuário autenticado do tipo ONG', description: CODIGOS_VALIDOS_TIPOS_CHAVES_PIX })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(USUARIO_NAO_AUTORIZADO)
    @ApiResponse(CHAVE_PIX_NAO_ENCONTRADA_COM_ID)
    @ApiResponse(TIPO_DA_CHAVE_PIX_INVALIDA)
    @ApiResponse(CHAVE_PIX_EXISTENTE_COM_TIPO_E_NOME_INFORMADOS)
    @ApiResponse(CHAVE_PIX_EDITADA)
    public editarChavePix(@Request() req: any, @Param('idPix', ParseIntPipe) idPix: number, @Body() body: PixDTO) {
        return this.pixService.editar(req.usuario.idUsuario, idPix, body);
    }

    @Put(ROTA_PIX)
    @Roles(TipoUsuario.ADMIN, TipoUsuario.ONG)
    @ApiBody({ type: [EditaPixDTO] })
    @ApiOperation({ summary: 'Edita uma lista de chaves Pix para o usuário autenticado do tipo ONG. Chaves Pix com mesmo tipo e valor já existentes serão consideradas uma única vez', description: CODIGOS_VALIDOS_TIPOS_CHAVES_PIX })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(USUARIO_NAO_AUTORIZADO)
    @ApiResponse(CHAVE_PIX_NAO_ENCONTRADA_COM_ID)
    @ApiResponse(TIPO_DA_CHAVE_PIX_INVALIDA)
    @ApiResponse(CHAVE_PIX_EXISTENTE_COM_TIPO_E_NOME_INFORMADOS)
    @ApiResponse(CHAVE_PIX_EDITADA)
    public editarListaChavePix(@Request() req: any, @Body() body: EditaPixDTO[]) {
        return this.pixService.editarLista(req.usuario.idUsuario, body);
    }

    @Delete(ROTA_PIX + '/:idPix')
    @Roles(TipoUsuario.ADMIN, TipoUsuario.ONG)
    @ApiOperation({ summary: 'Deleta uma chave Pix a partir do seu id para o usuário autenticado do tipo ONG' })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(USUARIO_NAO_AUTORIZADO)
    @ApiResponse(CHAVE_PIX_NAO_ENCONTRADA_COM_ID)
    @ApiResponse(CHAVE_PIX_DELETADA)
    public deletarChavePix(@Request() req: any, @Param('idPix', ParseIntPipe) idPix: number) {
        return this.pixService.deletar(req.usuario.idUsuario, idPix);
    }
}