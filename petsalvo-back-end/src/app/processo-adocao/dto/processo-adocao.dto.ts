import { ApiProperty } from "@nestjs/swagger";
import { TipoStatusProcessoAdocao } from "../enums/tipo-status-processo-adocao.enum";
import { IsNumber } from "class-validator";

export class ProcessoAdocaoDTO {

    @ApiProperty()
    @IsNumber()
    status: TipoStatusProcessoAdocao;  
}