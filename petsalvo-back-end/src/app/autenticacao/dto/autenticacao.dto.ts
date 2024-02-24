import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MaxLength } from "class-validator";

export class AutenticacaoDTO {

    @ApiProperty()
    @MaxLength(255)
    @IsEmail()
    email: string;

    //TODO: Validar se a senha preenche os requisitos
    @ApiProperty()
    @MaxLength(255)
    @IsString()
    senha: string;
}