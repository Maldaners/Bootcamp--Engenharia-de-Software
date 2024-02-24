import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, MaxLength } from "class-validator";
import { TipoChave } from "../enum/tipo-chave.enum";

export class PixDTO {

    @ApiProperty()
    @IsNumber()
    tipoChave: TipoChave;

    @ApiProperty()
    @MaxLength(255)
    @IsString()
    chave: string;
}