import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsPhoneNumber, IsString, MaxLength, NotEquals } from "class-validator";
import { AutenticacaoDTO } from "src/app/autenticacao/dto/autenticacao.dto";
import { TipoUsuario } from "../enum/tipoUsuario.enum";

export class UsuarioDTO extends AutenticacaoDTO {

    @ApiProperty()
    @MaxLength(255)
    @IsString()
    nome: string;

    @ApiProperty()
    @IsPhoneNumber('BR')
    telefone: string;

    @ApiProperty()
    tipoUsuario?: TipoUsuario;

    @ApiProperty()
    @IsBoolean()
    @NotEquals(false)
    termos: boolean;
    
}