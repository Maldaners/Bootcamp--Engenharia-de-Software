import { ApiProperty } from "@nestjs/swagger";
import { TipoStatusProcessoAdocao } from "../enums/tipo-status-processo-adocao.enum";

export class FiltroProcessoAdocaoDTO {

    @ApiProperty({ type: Number, isArray: true })
    status: TipoStatusProcessoAdocao[];
}