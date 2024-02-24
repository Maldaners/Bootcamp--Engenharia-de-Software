import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsString, MaxLength } from "class-validator";
import { SexoPet } from "../enum/sexo-pet.enum";
import { TipoPet } from "../enum/tipo-pet.enum";

export class PetDTO {

    @ApiProperty()
    @MaxLength(255)
    @IsString()
    nome: string;

    @ApiProperty()
    @IsNumber()
    idade: number;

    @ApiProperty()
    tipo: TipoPet;

    @ApiProperty()
    @MaxLength(1)
    sexo: SexoPet;

    @ApiProperty()
    @MaxLength(1000)
    @IsString()
    descricao: string;

    @ApiProperty()
    @IsBoolean()
    adotado: boolean;
}