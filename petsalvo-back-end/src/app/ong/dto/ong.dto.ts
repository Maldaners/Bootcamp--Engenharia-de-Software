import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmptyObject, IsString, MaxLength, ValidateNested } from "class-validator";
import { EnderecoDTO } from "src/app/endereco/dto/endereco.dto";
import { UsuarioDTO } from "src/app/usuario/dto/usuario.dtos";

export class OngDTO {

    idOng?: number;

    @ApiProperty()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => UsuarioDTO)
    usuario: UsuarioDTO;

    @ApiProperty({ required: false })
    site: string;

    @ApiProperty()
    @MaxLength(14)
    @IsString()
    cnpj: string;

    @ApiProperty()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => EnderecoDTO)
    endereco: EnderecoDTO;
}