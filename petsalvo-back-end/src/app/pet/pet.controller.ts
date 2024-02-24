import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Request, UploadedFiles, UseInterceptors, forwardRef } from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { ApiConsumes, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Roles } from "../autorizacao/decorators/autorizacao.decorator";
import { ListaImagemDTO } from "../imagem/dto/lista-imagem.dto";
import { ImagemPetService } from "../imagem/imagem-pet/imagem-pet.service";
import imagemPetInterceptor from "../imagem/imagem-pet/interceptors/imagem-pet.interceptors";
import { TipoUsuario } from "../usuario/enum/tipoUsuario.enum";
import { PetDTO } from "./dto/pet.dto";
import { PetService } from "./pet.service";
//
import { USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO } from "../autenticacao/responses/autenticacao.responses";
import { USUARIO_NAO_AUTORIZADO } from "../autorizacao/responses/autorizacao.responses";
import { IMAGEM_NAO_ENCONTRADA_COM_ID_DO_PET_OU_ID_DA_IMAGEM, IMAGEM_PET_ADICIONADA, IMAGEM_PET_DELETADA, IMAGEM_PET_RETORNADA, LISTA_IMAGEM_PET_RETORNADA, NENHUMA_IMAGEM_ENCONTRADA_COM_ID_DO_PET } from "../imagem/imagem-pet/responses/imagem-pet.responses";
import { FORMATO_DE_IMAGEM_NAO_PERMITIDO, IMAGEM_NAO_ANEXADA, NAO_PERMITIDO_CADASTRO_DE_MAIS_DE_5_IMAGENS } from "../imagem/responses/imagem.responses";
import { NAO_PERMITIDA_EXCLUSAO_TIPO_STATUS_PROCESSO_DE_ADOCAO_EM_ANALISE_OU_COM_PERFIL_ACEITO } from "../processo-adocao/responses/processo-adocao.responses";
import { LISTA_PET_RETORNADO, NENHUM_PET_CADASTRADO_PARA_ESTA_ONG, NENHUM_PET_NAO_ADOTADO_CADASTRADO, PET_CRIADO, PET_DELETADO, PET_EDITADO, PET_NAO_ENCONTRADO_COM_ID, PET_RETORNADO, VALOR_SEXO_PET_INVALIDO, VALOR_TIPO_PET_INVALIDO } from "./responses/pet.responses";
import { Public } from "../autenticacao/decorators/autenticacao.decorator";

//TODO: Importar corretamente
const ROTA_ONG = "ong";

export const TAG_PET = "Pet";
export const ROTA_PET = "pet";
const ROTA_IMAGEM = "imagem";
export const INTERCEPTADOR_IMAGEM_PET = "imagens";

@ApiTags(TAG_PET)
@Controller(ROTA_PET)
export class PetController {

    constructor(
        @Inject(forwardRef(() => PetService)) private readonly petService: PetService,
        @Inject(forwardRef(() => ImagemPetService)) private readonly imagemPetService: ImagemPetService
    ) { }

    @Post()
    @Roles(TipoUsuario.ADMIN, TipoUsuario.ONG)
    @ApiOperation({ summary: 'Cria um pet para o usuário autenticado do tipo ONG' })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(USUARIO_NAO_AUTORIZADO)
    @ApiResponse(VALOR_TIPO_PET_INVALIDO)
    @ApiResponse(VALOR_SEXO_PET_INVALIDO)
    @ApiResponse(PET_CRIADO)
    public criar(@Request() req: any, @Body() body: PetDTO) {
        return this.petService.criar(req.usuario.idUsuario, body);
    }

    @Get('todos')
    @Public()
    @ApiOperation({ summary: 'Retorna todos os pets cadastrados não adotados' })
    @ApiResponse(NENHUM_PET_NAO_ADOTADO_CADASTRADO)
    @ApiResponse(LISTA_PET_RETORNADO)
    public consultarTodosNaoAdotados(@Request() req: any) {
        return this.petService.consultarTodosNaoAdotados();
    }

    @Get()
    @Roles(TipoUsuario.ADMIN, TipoUsuario.ONG)
    @ApiOperation({ summary: 'Retorna todos os pets do usuário autenticado do tipo ONG' })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(USUARIO_NAO_AUTORIZADO)
    @ApiResponse(NENHUM_PET_CADASTRADO_PARA_ESTA_ONG)
    @ApiResponse(LISTA_PET_RETORNADO)
    public consultarTodos(@Request() req: any) {
        return this.petService.consultarTodos(req.usuario.idUsuario);
    }

    @Get(ROTA_ONG + '/:idOng')
    @ApiOperation({ summary: 'Retorna todos os pets a partir do id da ONG informado' })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(USUARIO_NAO_AUTORIZADO)
    @ApiResponse(NENHUM_PET_CADASTRADO_PARA_ESTA_ONG)
    @ApiResponse(LISTA_PET_RETORNADO)
    public consultarTodosPorIdUsuario(@Param('idOng', ParseIntPipe) idOng: number) {
        return this.petService.consultarTodos(idOng);
    }

    @Get(':idPet')
    @Roles(TipoUsuario.ADMIN, TipoUsuario.ONG)
    @ApiOperation({ summary: 'Retorna um pet a partir do seu id para o usuário autenticado do tipo ONG' })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(USUARIO_NAO_AUTORIZADO)
    @ApiResponse(PET_NAO_ENCONTRADO_COM_ID)
    @ApiResponse(PET_RETORNADO)
    public consultar(@Request() req: any, @Param('idPet', ParseIntPipe) idPet: number) {
        return this.petService.consultarPorId(req.usuario.idUsuario, idPet);
    }

    @Get(':idPet/' + ROTA_ONG + '/:idOng')
    @Public()
    @ApiOperation({ summary: 'Retorna um pet a partir dos ids do pet e da ONG informados' })
    @ApiResponse(PET_NAO_ENCONTRADO_COM_ID)
    @ApiResponse(PET_RETORNADO)
    public consultarPorIdUsuario(@Param('idOng', ParseIntPipe) idOng: number, @Param('idPet', ParseIntPipe) idPet: number) {
        return this.petService.consultarPorIdOng(idOng, idPet);
    }

    @Put(':idPet')
    @Roles(TipoUsuario.ADMIN, TipoUsuario.ONG)
    @ApiOperation({ summary: 'Edita um pet a partir do seu id para o usuário autenticado do tipo ONG' })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(USUARIO_NAO_AUTORIZADO)
    @ApiResponse(PET_NAO_ENCONTRADO_COM_ID)
    @ApiResponse(VALOR_TIPO_PET_INVALIDO)
    @ApiResponse(VALOR_SEXO_PET_INVALIDO)
    @ApiResponse(PET_EDITADO)
    public editar(@Request() req: any, @Param('idPet', ParseIntPipe) idPet: number, @Body() body: PetDTO) {
        return this.petService.editar(req.usuario.idUsuario, idPet, body);
    }

    @Delete(':idPet')
    @Roles(TipoUsuario.ADMIN, TipoUsuario.ONG)
    @ApiOperation({ summary: 'Deleta um pet a partir do seu id para o usuário autenticado do tipo ONG' })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(USUARIO_NAO_AUTORIZADO)
    @ApiResponse(PET_NAO_ENCONTRADO_COM_ID)
    @ApiResponse(NAO_PERMITIDA_EXCLUSAO_TIPO_STATUS_PROCESSO_DE_ADOCAO_EM_ANALISE_OU_COM_PERFIL_ACEITO)
    @ApiResponse(PET_DELETADO)
    public deletar(@Request() req: any, @Param('idPet', ParseIntPipe) idPet: number) {
        return this.petService.deletar(req.usuario.idUsuario, idPet);
    }

    //TODO: Validar documentação do Swagger quando há status para respostas iguais (atualmente há sobreposição)
    //Imagem
    @Post(':idPet/' + ROTA_IMAGEM)
    @Roles(TipoUsuario.ADMIN, TipoUsuario.ONG)
    @UseInterceptors(FileFieldsInterceptor([{ name: INTERCEPTADOR_IMAGEM_PET }], imagemPetInterceptor))
    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'Adiciona até 5 imagens para o pet a partir do seu id informado. O usuário autenticado deve ser do tipo ONG' })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(USUARIO_NAO_AUTORIZADO)
    @ApiResponse(PET_NAO_ENCONTRADO_COM_ID)
    @ApiResponse(IMAGEM_NAO_ANEXADA)
    @ApiResponse(FORMATO_DE_IMAGEM_NAO_PERMITIDO)
    @ApiResponse(NAO_PERMITIDO_CADASTRO_DE_MAIS_DE_5_IMAGENS)
    @ApiResponse(IMAGEM_PET_ADICIONADA)
    public criarImagem(@Request() req: any, @Param('idPet', ParseIntPipe) idPet: number, @UploadedFiles() imagens: Express.Multer.File[], @Body() body: ListaImagemDTO) {
        return this.imagemPetService.criar(req.usuario.idUsuario, idPet, body, imagens);
    }

    @Get(':idPet/' + ROTA_IMAGEM)
    @Roles(TipoUsuario.ADMIN, TipoUsuario.ONG)
    @ApiOperation({ summary: 'Consulta as URLs das imagens do pet a partir do id informado. O usuário autenticado deve ser do tipo ONG' })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(USUARIO_NAO_AUTORIZADO)
    @ApiResponse(PET_NAO_ENCONTRADO_COM_ID)
    @ApiResponse(NENHUMA_IMAGEM_ENCONTRADA_COM_ID_DO_PET)
    @ApiResponse(LISTA_IMAGEM_PET_RETORNADA)
    public consultarImagens(@Request() req: any, @Param('idPet', ParseIntPipe) idPet: number) {
        return this.imagemPetService.consultarTodas(req.usuario.idUsuario, idPet);
    }

    @Get(':idPet/' + ROTA_ONG + '/:idOng/' + ROTA_IMAGEM)
    @ApiOperation({ summary: 'Consulta as URLs das imagens do pet a partir dos ids de pet e ONG informados' })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(USUARIO_NAO_AUTORIZADO)
    @ApiResponse(PET_NAO_ENCONTRADO_COM_ID)
    @ApiResponse(NENHUMA_IMAGEM_ENCONTRADA_COM_ID_DO_PET)
    @ApiResponse(LISTA_IMAGEM_PET_RETORNADA)
    public consultarImagensPorIdUsuario(@Param('idOng', ParseIntPipe) idOng: number, @Param('idPet', ParseIntPipe) idPet: number) {
        return this.imagemPetService.consultarTodasPorIdOng(idOng, idPet);
    }

    @Get(':idPet/' + ROTA_IMAGEM + '/:idImagem')
    @Roles(TipoUsuario.ADMIN, TipoUsuario.ONG)
    @ApiOperation({ summary: 'Consulta a URL da imagem do pet a partir dos ids de pet e imagem informados. O usuário autenticado deve ser do tipo ONG' })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(USUARIO_NAO_AUTORIZADO)
    @ApiResponse(PET_NAO_ENCONTRADO_COM_ID)
    @ApiResponse(IMAGEM_NAO_ENCONTRADA_COM_ID_DO_PET_OU_ID_DA_IMAGEM)
    @ApiResponse(IMAGEM_PET_RETORNADA)
    public consultarImagem(@Request() req: any, @Param('idPet', ParseIntPipe) idPet: number, @Param('idImagem', ParseIntPipe) idImagem: number) {
        return this.imagemPetService.consultarPorId(req.usuario.idUsuario, idPet, idImagem);
    }

    @Get(':idPet/' + ROTA_ONG + '/:idOng/' + ROTA_IMAGEM + '/:idImagem')
    @ApiOperation({ summary: 'Consulta a URL da imagem do pet a partir dos ids de pet, ONG e imagem informados' })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(USUARIO_NAO_AUTORIZADO)
    @ApiResponse(PET_NAO_ENCONTRADO_COM_ID)
    @ApiResponse(IMAGEM_NAO_ENCONTRADA_COM_ID_DO_PET_OU_ID_DA_IMAGEM)
    @ApiResponse(IMAGEM_PET_RETORNADA)
    public consultarImagemPorIdUsuario(@Param('idOng', ParseIntPipe) idOng: number, @Param('idPet', ParseIntPipe) idPet: number, @Param('idImagem', ParseIntPipe) idImagem: number) {
        return this.imagemPetService.consultarPorIdOng(idOng, idPet, idImagem);
    }

    @Delete(':idPet/' + ROTA_IMAGEM + '/:idImagem')
    @Roles(TipoUsuario.ADMIN, TipoUsuario.ONG)
    @ApiOperation({ summary: 'Deleta a imagem do pet a partir dos ids de pet e imagem informados. O usuário autenticado deve ser do tipo ONG' })
    @ApiResponse(USUARIO_NAO_AUTENTICADO_OU_TOKEN_EXPIRADO)
    @ApiResponse(USUARIO_NAO_AUTORIZADO)
    @ApiResponse(PET_NAO_ENCONTRADO_COM_ID)
    @ApiResponse(IMAGEM_NAO_ENCONTRADA_COM_ID_DO_PET_OU_ID_DA_IMAGEM)
    @ApiResponse(IMAGEM_PET_DELETADA)
    public deletarImagem(@Request() req: any, @Param('idPet', ParseIntPipe) idPet: number, @Param('idImagem', ParseIntPipe) idImagem: number) {
        return this.imagemPetService.deletar(req.usuario.idUsuario, idPet, idImagem);
    }
}