import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Request, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiConsumes, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { OngDTO } from "src/app/ong/dto/ong.dto";
import { OngService } from "src/app/ong/ong.service";
import { Public } from "../autenticacao/decorators/autenticacao.decorator";
import { Roles } from "../autorizacao/decorators/autorizacao.decorator";
import { ImagemDTO } from "../imagem/dto/imagem.dto";
import { ImagemUsuarioService } from "../imagem/imagem-usuario/imagem-usuario.service";
import imagemUsuarioInterceptor from "../imagem/imagem-usuario/interceptors/imagem-usuario.interceptors";
import { TipoUsuario } from "../usuario/enum/tipoUsuario.enum";
//
import { USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO } from "../autenticacao/responses/autenticacao.responses";
import { USUARIO_NAO_AUTORIZADO } from "../autorizacao/responses/autorizacao.responses";
import { IMAGEM_ADICIONADA, IMAGEM_DELETADA, IMAGEM_NAO_ENCONTRADA_PARA_O_TIPO_E_ID_DO_USUARIO, IMAGEM_RETORNADA } from "../imagem/imagem-usuario/responses/imagem-usuario.responses";
import { FORMATO_DE_IMAGEM_NAO_PERMITIDO, IMAGEM_NAO_ANEXADA, NAO_PERMITIDO_UPLOADO_DE_MAIS_DE_UMA_IMAGEM } from "../imagem/responses/imagem.responses";
import { USUARIO_EXISTENTE_COM_EMAIL_INFORMADO, USUARIO_NAO_ENCONTRADO_COM_ID } from "../usuario/responses/usuario.responses";
import { LISTA_ONGS_RETORNADAS, NENHUMA_ONG_CADASTRADA, ONG_CRIADA, ONG_DELETADA, ONG_EDITADA, ONG_NAO_ENCONTRADA_COM_ID_DO_USUARIO, ONG_RETORNADA } from "./responses/ong.responses";
import { ROTA_USUARIO } from "../usuario/usuario.controller";
import { NAO_PERMITIDA_EXCLUSAO_TIPO_STATUS_PROCESSO_DE_ADOCAO_EM_ANALISE_OU_COM_PERFIL_ACEITO } from "../processo-adocao/responses/processo-adocao.responses";
import { CriarOngDTO } from "./dto/criar-ong.dto";
import { NAO_PERMITIDO_CADASTRO_DE_MAIS_DE_5_STATUS } from "../status/responses/status.responses";
import { NAO_PERMITIDO_CADASTRO_DE_MAIS_DE_5_CHAVES_PIX, TIPO_DA_CHAVE_PIX_INVALIDA } from "../pix/responses/pix.responses";

export const TAG_ONG = "Ong";
export const ROTA_ONG = "ong";
const ROTA_IMAGEM = "imagem";

@ApiTags(TAG_ONG)
@Controller(ROTA_ONG)
export class OngController {

    constructor(
        private readonly ongService: OngService,
        private readonly imagemUsuarioService: ImagemUsuarioService
    ) { }

    @Post()
    @Public()
    @ApiOperation({ summary: 'Cria um usuário do tipo ONG' })
    @ApiResponse(USUARIO_EXISTENTE_COM_EMAIL_INFORMADO)
    @ApiResponse(NAO_PERMITIDO_CADASTRO_DE_MAIS_DE_5_STATUS)
    @ApiResponse(NAO_PERMITIDO_CADASTRO_DE_MAIS_DE_5_CHAVES_PIX)
    @ApiResponse(TIPO_DA_CHAVE_PIX_INVALIDA)
    @ApiResponse(ONG_CRIADA)
    public criar(@Body() body: CriarOngDTO) {
        return this.ongService.criar(body);
    }
    
    @Get()
    @Roles(TipoUsuario.ADMIN, TipoUsuario.ONG)
    @ApiOperation({ summary: 'Retorna o usuário autenticado do tipo ONG' })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(USUARIO_NAO_AUTORIZADO)
    @ApiResponse(ONG_NAO_ENCONTRADA_COM_ID_DO_USUARIO)
    @ApiResponse(ONG_RETORNADA)
    public consultar(@Request() req: any) {
        return this.ongService.consultarPorId(req.usuario.idUsuario);
    }

    @Get(ROTA_USUARIO + '/:idUsuario')
    @ApiOperation({ summary: 'Retorna o usuário do tipo ONG a partir do id do usuário informado' })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(USUARIO_NAO_AUTORIZADO)
    @ApiResponse(ONG_NAO_ENCONTRADA_COM_ID_DO_USUARIO)
    @ApiResponse(ONG_RETORNADA)
    public consultarPorIdUsuario(@Param('idUsuario', ParseIntPipe) idUsuario: number) {
        return this.ongService.consultarPorId(idUsuario);
    }

    @Get('todas')
    @Public()
    @ApiOperation({ summary: 'Retorna uma lista de usuários do tipo ONG' })
    @ApiResponse(NENHUMA_ONG_CADASTRADA)
    @ApiResponse(LISTA_ONGS_RETORNADAS)
    public consultarTodas() {
        return this.ongService.consultarTodas();
    }

    @Put()
    @Roles(TipoUsuario.ADMIN, TipoUsuario.ONG)
    @ApiOperation({ summary: 'Edita o usuário autenticado do tipo ONG' })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(USUARIO_NAO_AUTORIZADO)
    @ApiResponse(USUARIO_NAO_ENCONTRADO_COM_ID)
    @ApiResponse(USUARIO_EXISTENTE_COM_EMAIL_INFORMADO)
    @ApiResponse(ONG_EDITADA)
    public editar(@Request() req: any, @Body() body: OngDTO) {
        return this.ongService.editar(req.usuario.idUsuario, body);
    }

    @Delete()
    @Roles(TipoUsuario.ADMIN, TipoUsuario.ONG)
    @ApiOperation({ summary: 'Deleta o usuário autenticado do tipo ONG' })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(USUARIO_NAO_AUTORIZADO)
    @ApiResponse(USUARIO_NAO_ENCONTRADO_COM_ID)
    @ApiResponse(NAO_PERMITIDA_EXCLUSAO_TIPO_STATUS_PROCESSO_DE_ADOCAO_EM_ANALISE_OU_COM_PERFIL_ACEITO)
    @ApiResponse(ONG_DELETADA)
    public deletar(@Request() req: any) {
        return this.ongService.deletar(req.usuario.idUsuario);
    }

    //Imagem
    @Post(ROTA_IMAGEM)
    @Roles(TipoUsuario.ADMIN, TipoUsuario.ONG)
    @UseInterceptors(FileInterceptor('file', imagemUsuarioInterceptor))
    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'Adiciona uma imagem para o usuário autenticado do tipo ONG' })
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
    @Roles(TipoUsuario.ADMIN, TipoUsuario.ONG)
    @ApiOperation({ summary: 'Consulta a URL da imagem do usuário autenticado do tipo ONG' })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(USUARIO_NAO_AUTORIZADO)
    @ApiResponse(USUARIO_NAO_ENCONTRADO_COM_ID)
    @ApiResponse(IMAGEM_NAO_ENCONTRADA_PARA_O_TIPO_E_ID_DO_USUARIO)
    @ApiResponse(IMAGEM_RETORNADA)
    public consultarImagem(@Request() req: any) {
        return this.imagemUsuarioService.consultarPorId(req.usuario.idUsuario, TipoUsuario.ONG);
    }

    @Get(ROTA_USUARIO + '/:idUsuario/' + ROTA_IMAGEM)
    @ApiOperation({ summary: 'Consulta a URL da imagem do usuário do tipo ONG a partir do id do usuário informado' })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(USUARIO_NAO_AUTORIZADO)
    @ApiResponse(USUARIO_NAO_ENCONTRADO_COM_ID)
    @ApiResponse(IMAGEM_NAO_ENCONTRADA_PARA_O_TIPO_E_ID_DO_USUARIO)
    @ApiResponse(IMAGEM_RETORNADA)
    public consultarImagemPorIdUsuario(@Param('idUsuario', ParseIntPipe) idUsuario: number) {
        return this.imagemUsuarioService.consultarPorId(idUsuario, TipoUsuario.ONG);
    }

    @Delete(ROTA_IMAGEM)
    @Roles(TipoUsuario.ADMIN, TipoUsuario.ONG)
    @ApiOperation({ summary: 'Deleta a imagem do usuário autenticado do tipo ONG' })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(USUARIO_NAO_AUTORIZADO)
    @ApiResponse(USUARIO_NAO_ENCONTRADO_COM_ID)
    @ApiResponse(IMAGEM_DELETADA)
    public deletarImagem(@Request() req: any) {
        return this.imagemUsuarioService.deletar(req.usuario.idUsuario, TipoUsuario.ONG);
    }
}