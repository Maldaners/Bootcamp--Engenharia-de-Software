import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, MaxLength } from "class-validator";

export class EnderecoDTO {

    @ApiProperty()
    @MaxLength(8)
    @IsString()
    cep: string;

    @ApiProperty()
    @MaxLength(255)
    @IsString()
    rua: string;

    @ApiProperty()
    @MaxLength(255)
    @IsString()
    bairro: string;

    @ApiProperty()
    @IsNumber()
    numero: number;

    @ApiProperty()
    @MaxLength(255)
    @IsString()
    cidade: string;

    @ApiProperty()
    @MaxLength(255)
    @IsString()
    estado: string;

    @ApiProperty()
    @MaxLength(255)
    @IsString()
    complemento: string;

}