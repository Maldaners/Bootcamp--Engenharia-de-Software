import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength } from "class-validator";

export class StatusDTO {

    @ApiProperty()
    @MaxLength(255)
    @IsString()
    nome: string;
}