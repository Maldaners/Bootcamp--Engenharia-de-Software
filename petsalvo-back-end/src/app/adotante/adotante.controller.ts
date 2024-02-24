import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Request, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiConsumes, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Public } from "../autenticacao/decorators/autenticacao.decorator";
import { Roles } from "../autorizacao/decorators/autorizacao.decorator";
import { ImagemDTO } from "../imagem/dto/imagem.dto";
import { ImagemUsuarioService } from "../imagem/imagem-usuario/imagem-usuario.service";
import imagemUsuarioInterceptor from "../imagem/imagem-usuario/interceptors/imagem-usuario.interceptors";
import { TipoUsuario } from "../usuario/enum/tipoUsuario.enum";
import { AdotanteService } from "./adotante.service";
import { AdotanteDTO } from "./dto/adotante.dto";
import { ROTA_USUARIO } from "../usuario/usuario.controller";
//
import { USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO } from "../autenticacao/responses/autenticacao.responses";
import { USUARIO_NAO_AUTORIZADO } from "../autorizacao/responses/autorizacao.responses";
import { IMAGEM_ADICIONADA, IMAGEM_DELETADA, IMAGEM_NAO_ENCONTRADA_PARA_O_TIPO_E_ID_DO_USUARIO, IMAGEM_RETORNADA } from "../imagem/imagem-usuario/responses/imagem-usuario.responses";
import { FORMATO_DE_IMAGEM_NAO_PERMITIDO, IMAGEM_NAO_ANEXADA, NAO_PERMITIDO_UPLOADO_DE_MAIS_DE_UMA_IMAGEM } from "../imagem/responses/imagem.responses";
import { USUARIO_EXISTENTE_COM_EMAIL_INFORMADO, USUARIO_NAO_ENCONTRADO_COM_ID } from "../usuario/responses/usuario.responses";
import { ADOTANTE_CRIADO, ADOTANTE_DELETADO, ADOTANTE_EDITADO, ADOTANTE_NAO_ENCONTRADO_COM_ID_DO_USUARIO, ADOTANTE_RETORNADO, LISTA_ADOTANTES_RETORNADOS, NENHUM_ADOTANTE_CADASTRADO } from "./responses/adotante.responses";
import { NAO_PERMITIDA_EXCLUSAO_TIPO_STATUS_PROCESSO_DE_ADOCAO_EM_ANALISE_OU_COM_PERFIL_ACEITO } from "../processo-adocao/responses/processo-adocao.responses";
import { CriarAdotanteDTO } from "./dto/criar-adotante.dto";
import { RESPOSTA_REPETIDA_OU_EXISTENTE_PARA_A_PERGUNTA, UMA_OU_MAIS_RESPOSTAS_NAO_ENCONTRADAS_COM_ID_INFORMADO } from "../formulario/responses/formulario.responses";

export const TAG_ADOTANTE = "Adotante";
export const ROTA_ADOTANTE = "adotante";
const ROTA_IMAGEM = "imagem";

@ApiTags(TAG_ADOTANTE)
@Controller(ROTA_ADOTANTE)
export class AdotanteController {

    constructor(
        private readonly adotanteService: AdotanteService,
        private readonly imagemUsuarioService: ImagemUsuarioService
    ) { }

    @Post()
    @Public()
    @ApiOperation({ summary: 'Cria um usuário do tipo adotante' })
    @ApiResponse(USUARIO_EXISTENTE_COM_EMAIL_INFORMADO)
    @ApiResponse(UMA_OU_MAIS_RESPOSTAS_NAO_ENCONTRADAS_COM_ID_INFORMADO)
    @ApiResponse(RESPOSTA_REPETIDA_OU_EXISTENTE_PARA_A_PERGUNTA)
    @ApiResponse(ADOTANTE_CRIADO)
    public criar(@Body() body: CriarAdotanteDTO) {
        return this.adotanteService.criar(body);
    }

    @Get()
    @Roles(TipoUsuario.ADMIN, TipoUsuario.ADOTANTE)
    @ApiOperation({ summary: 'Retorna o usuário autenticado do tipo adotante' })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(USUARIO_NAO_AUTORIZADO)
    @ApiResponse(ADOTANTE_NAO_ENCONTRADO_COM_ID_DO_USUARIO)
    @ApiResponse(ADOTANTE_RETORNADO)
    public consultar(@Request() req: any) {
        return this.adotanteService.consultarPorId(req.usuario.idUsuario);
    }

    @Get(ROTA_USUARIO + '/:idUsuario')
    @ApiOperation({ summary: 'Retorna o usuário do tipo adotante a partir do id do usuário informado' })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(USUARIO_NAO_AUTORIZADO)
    @ApiResponse(ADOTANTE_NAO_ENCONTRADO_COM_ID_DO_USUARIO)
    @ApiResponse(ADOTANTE_RETORNADO)
    public consultarPorIdUsuario(@Param('idUsuario', ParseIntPipe) idUsuario: number) {
        return this.adotanteService.consultarPorId(idUsuario);
    }

    @Get('todos')
    @ApiOperation({ summary: 'Retorna uma lista de usuários do tipo adotante' })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(NENHUM_ADOTANTE_CADASTRADO)
    @ApiResponse(LISTA_ADOTANTES_RETORNADOS)
    public consultarTodos() {
        return this.adotanteService.consultarTodos();
    }

    @Put()
    @Roles(TipoUsuario.ADMIN, TipoUsuario.ADOTANTE)
    @ApiOperation({ summary: 'Edita o usuário autenticado do tipo adotante' })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(USUARIO_NAO_AUTORIZADO)
    @ApiResponse(USUARIO_NAO_ENCONTRADO_COM_ID)
    @ApiResponse(USUARIO_EXISTENTE_COM_EMAIL_INFORMADO)
    @ApiResponse(ADOTANTE_EDITADO)
    public editar(@Request() req: any, @Body() body: AdotanteDTO) {
        return this.adotanteService.editar(req.usuario.idUsuario, body);
    }

    @Delete()
    @Roles(TipoUsuario.ADMIN, TipoUsuario.ADOTANTE)
    @ApiOperation({ summary: 'Deleta o usuário autenticado do tipo adotante' })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(USUARIO_NAO_AUTORIZADO)
    @ApiResponse(USUARIO_NAO_ENCONTRADO_COM_ID)
    @ApiResponse(NAO_PERMITIDA_EXCLUSAO_TIPO_STATUS_PROCESSO_DE_ADOCAO_EM_ANALISE_OU_COM_PERFIL_ACEITO)
    @ApiResponse(ADOTANTE_DELETADO)
    public deletar(@Request() req: any) {
        return this.adotanteService.deletar(req.usuario.idUsuario);
    }

    //Imagem
    @Post(ROTA_IMAGEM)
    @Roles(TipoUsuario.ADMIN, TipoUsuario.ADOTANTE)
    @UseInterceptors(FileInterceptor('file', imagemUsuarioInterceptor))
    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'Adiciona uma imagem para o usuário autenticado do tipo adotante' })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(USUARIO_NAO_AUTORIZADO)
    @ApiResponse(USUARIO_NAO_ENCONTRADO_COM_ID)
    @ApiResponse(IMAGEM_NAO_ANEXADA)
    @ApiResponse(FORMATO_DE_IMAGEM_NAO_PERMITIDO)
    @ApiResponse(NAO_PERMITIDO_UPLOADO_DE_MAIS_DE_UMA_IMAGEM)
    @ApiResponse(IMAGEM_ADICIONADA)
    public criarImagem(@Request() req: any, @UploadedFile('file') imagem: Express.Multer.File, @Body() body: ImagemDTO) {
        return this.imagemUsuarioService.criar(req, req.usuario.idUsuario, body, imagem);
    }

    @Get(ROTA_IMAGEM)
    @Roles(TipoUsuario.ADMIN, TipoUsuario.ADOTANTE)
    @ApiOperation({ summary: 'Consulta a URL da imagem do usuário autenticado do tipo adotante' })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(USUARIO_NAO_AUTORIZADO)
    @ApiResponse(USUARIO_NAO_ENCONTRADO_COM_ID)
    @ApiResponse(IMAGEM_NAO_ENCONTRADA_PARA_O_TIPO_E_ID_DO_USUARIO)
    @ApiResponse(IMAGEM_RETORNADA)
    public consultarImagem(@Request() req: any) {
        return this.imagemUsuarioService.consultarPorId(req.usuario.idUsuario, TipoUsuario.ADOTANTE);
    }

    @Get(ROTA_USUARIO + '/:idUsuario/' + ROTA_IMAGEM)
    @ApiOperation({ summary: 'Consulta a URL da imagem do usuário do tipo adotante a partir do id do usuário informado' })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(USUARIO_NAO_AUTORIZADO)
    @ApiResponse(USUARIO_NAO_ENCONTRADO_COM_ID)
    @ApiResponse(IMAGEM_NAO_ENCONTRADA_PARA_O_TIPO_E_ID_DO_USUARIO)
    @ApiResponse(IMAGEM_RETORNADA)
    public consultarImagemPorIdUsuario(@Param('idUsuario', ParseIntPipe) idUsuario: number) {
        return this.imagemUsuarioService.consultarPorId(idUsuario, TipoUsuario.ADOTANTE);
    }

    @Delete(ROTA_IMAGEM)
    @Roles(TipoUsuario.ADMIN, TipoUsuario.ADOTANTE)
    @ApiOperation({ summary: 'Deleta a imagem do usuário autenticado do tipo adotante' })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(USUARIO_NAO_AUTORIZADO)
    @ApiResponse(USUARIO_NAO_ENCONTRADO_COM_ID)
    @ApiResponse(IMAGEM_DELETADA)
    public deletarImagem(@Request() req: any) {
        return this.imagemUsuarioService.deletar(req.usuario.idUsuario, TipoUsuario.ADOTANTE);
    }
}