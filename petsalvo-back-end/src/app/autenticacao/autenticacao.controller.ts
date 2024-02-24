import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger/dist/decorators';
import { AutenticacaoService } from 'src/app/autenticacao/autenticacao.service';
import { CODIGOS_VALIDOS_TIPOS_USUARIOS } from '../usuario/enum/tipoUsuario.enum';
import { Public } from './decorators/autenticacao.decorator';
import { AutenticacaoDTO } from './dto/autenticacao.dto';
import { USUARIO_AUTENTICADO, USUARIO_OU_SENHA_INVALIDOS } from './responses/autenticacao.responses';

@ApiTags('Autenticação')
@Controller('autenticacao')
export class AutenticacaoController {

  constructor(private readonly autenticacaoService: AutenticacaoService) { }

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Realiza a autenticação do usuário', description: CODIGOS_VALIDOS_TIPOS_USUARIOS })
  @ApiResponse(USUARIO_OU_SENHA_INVALIDOS)
  @ApiResponse(USUARIO_AUTENTICADO)
  public login(@Body() body: AutenticacaoDTO) {
    return this.autenticacaoService.validarUsuario(body.email, body.senha);
  }
}