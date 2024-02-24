import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Request } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ROTA_ADOTANTE, TAG_ADOTANTE } from "../adotante/adotante.controller";
import { USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO } from "../autenticacao/responses/autenticacao.responses";
import { Roles } from "../autorizacao/decorators/autorizacao.decorator";
import { USUARIO_NAO_AUTORIZADO } from "../autorizacao/responses/autorizacao.responses";
import { TipoUsuario } from "../usuario/enum/tipoUsuario.enum";
import { EditaFormularioRespostaAdotanteDTO } from "./dtos/edita-formulario-resposta-adotante.dto";
import { FormularioRespostaAdotanteDTO } from "./dtos/formulario-resposta-adotante.dto";
import { FormularioService } from "./formulario.service";
import { FORMULARIO_ADOTANTE_CRIADO, FORMULARIO_ADOTANTE_DELETADO, FORMULARIO_ADOTANTE_EDITADO, FORMULARIO_ADOTANTE_NAO_ENCONTRADO, FORMULARIO_PADRAO_NAO_ENCONTRADO, FORMULARIO_RESPOSTA_RETORNADO, FORMULARIO_RETORNADO, RESPOSTA_REPETIDA_OU_EXISTENTE_PARA_A_PERGUNTA, RESPOSTA_PERTENCE_A_OUTRA_PERGUNTA, UMA_OU_MAIS_RESPOSTAS_NAO_ENCONTRADAS_COM_ID_INFORMADO } from "./responses/formulario.responses";
import { ROTA_USUARIO } from "../usuario/usuario.controller";
import { Public } from "../autenticacao/decorators/autenticacao.decorator";

const ROTA_FORMULARIO = 'formulario';
const ROTA_FORMULARIO_RESPOSTA = ROTA_FORMULARIO + '-resposta';

@ApiTags(TAG_ADOTANTE)
@Controller(ROTA_ADOTANTE)
export class FormularioController {

    constructor(
        private readonly formularioService: FormularioService
    ) { }

    @Get(ROTA_FORMULARIO)
    @Public()
    @ApiOperation({ summary: 'Retorna o formulário completo' })
    @ApiResponse(FORMULARIO_PADRAO_NAO_ENCONTRADO)
    @ApiResponse(FORMULARIO_RETORNADO)
    public consultarFormularioPadrao() {
        return this.formularioService.consultarFormularioPadrao();
    }

    @Post(ROTA_FORMULARIO_RESPOSTA)
    @Roles(TipoUsuario.ADMIN, TipoUsuario.ADOTANTE)
    @ApiBody({ type: [FormularioRespostaAdotanteDTO] })
    @ApiOperation({ summary: 'Cria uma lista de respostas para o formulário do usuário autenticado do tipo adotante' })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(USUARIO_NAO_AUTORIZADO)
    @ApiResponse(UMA_OU_MAIS_RESPOSTAS_NAO_ENCONTRADAS_COM_ID_INFORMADO)
    @ApiResponse(RESPOSTA_REPETIDA_OU_EXISTENTE_PARA_A_PERGUNTA)
    @ApiResponse(FORMULARIO_ADOTANTE_CRIADO)
    public criarFormularioAdotante(@Request() req: any, @Body() body: FormularioRespostaAdotanteDTO[]) {
        return this.formularioService.criarFormularioAdotante(req.usuario.idUsuario, body);
    }

    @Get(ROTA_FORMULARIO_RESPOSTA)
    @Roles(TipoUsuario.ADMIN, TipoUsuario.ADOTANTE)
    @ApiOperation({ summary: 'Retorna as respostas do formulário para o usuário autenticado do tipo do adotante' })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(USUARIO_NAO_AUTORIZADO)
    @ApiResponse(FORMULARIO_ADOTANTE_NAO_ENCONTRADO)
    @ApiResponse(FORMULARIO_RESPOSTA_RETORNADO)
    public consultarFormularioRespondidoAdotante(@Request() req: any) {
        return this.formularioService.consultarFormularioRespondidoAdotante(req.usuario.idUsuario);
    }

    @Get(ROTA_FORMULARIO_RESPOSTA + '/' + ROTA_USUARIO + '/:idUsuario')
    @Roles(TipoUsuario.ADMIN, TipoUsuario.ONG)
    @ApiOperation({ summary: 'Retorna as respostas do formulário para o usuário do tipo ONG a partir do id do usuário informado' })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(USUARIO_NAO_AUTORIZADO)
    @ApiResponse(FORMULARIO_ADOTANTE_NAO_ENCONTRADO)
    @ApiResponse(FORMULARIO_RESPOSTA_RETORNADO)
    public consultarFormularioRespondidoAdotantePorIdUsuario(@Param('idUsuario', ParseIntPipe) idUsuario: number) {
        return this.formularioService.consultarFormularioRespondidoAdotante(idUsuario);
    }

    @Put(ROTA_FORMULARIO_RESPOSTA)
    @Roles(TipoUsuario.ADMIN, TipoUsuario.ADOTANTE)
    @ApiBody({ type: [EditaFormularioRespostaAdotanteDTO] })
    @ApiOperation({ summary: 'Edita uma lista de respostas para o formulário do usuário autenticado do tipodo adotante' })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(USUARIO_NAO_AUTORIZADO)
    @ApiResponse(UMA_OU_MAIS_RESPOSTAS_NAO_ENCONTRADAS_COM_ID_INFORMADO)
    @ApiResponse(FORMULARIO_ADOTANTE_NAO_ENCONTRADO)
    @ApiResponse(RESPOSTA_PERTENCE_A_OUTRA_PERGUNTA)
    @ApiResponse(FORMULARIO_ADOTANTE_EDITADO)
    public editarFormularioRespondidoAdotante(@Request() req: any, @Body() body: EditaFormularioRespostaAdotanteDTO[]) {
        return this.formularioService.editarFormularioRespondidoAdotante(req.usuario.idUsuario, body);
    }

    @Delete(ROTA_FORMULARIO_RESPOSTA)
    @Roles(TipoUsuario.ADMIN, TipoUsuario.ADOTANTE)
    @ApiOperation({ summary: 'Deleta todas as respostas para o formulário do usuário autenticado do tipo adotante' })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(USUARIO_NAO_AUTORIZADO)
    @ApiResponse(FORMULARIO_ADOTANTE_NAO_ENCONTRADO)
    @ApiResponse(FORMULARIO_ADOTANTE_DELETADO)
    public deletarFormularioRespondidoAdotante(@Request() req: any) {
        return this.formularioService.deletarFormularioRespondidoAdotante(req.usuario.idUsuario);
    }
}