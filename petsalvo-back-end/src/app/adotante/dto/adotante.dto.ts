import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDateString, IsNotEmptyObject, IsString, MaxLength, ValidateNested } from "class-validator";
import { EnderecoDTO } from "src/app/endereco/dto/endereco.dto";
import { UsuarioDTO } from "src/app/usuario/dto/usuario.dtos";

export class AdotanteDTO {

    idAdotante?: number;

    @ApiProperty()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => UsuarioDTO)
    usuario: UsuarioDTO;

    @ApiProperty()
    @IsDateString()
    dataNasc: Date;

    @ApiProperty()
    @MaxLength(11)
    @IsString()
    cpf: string;

    @ApiProperty()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => EnderecoDTO)
    endereco: EnderecoDTO;

}