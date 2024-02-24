import { ApiProperty } from "@nestjs/swagger";
import { ConsultaAdotanteDTO } from "src/app/adotante/dto/consulta-adotante.dto";
import { ConsultaProcessoAdocaoDTO } from "./consulta-processo-adocao.dto";

export class ConsultaProcessoAdocaoOngDTO extends ConsultaProcessoAdocaoDTO {

    @ApiProperty()
    idAdotante: number;

    @ApiProperty({ type: ConsultaAdotanteDTO })
    adotante: ConsultaAdotanteDTO;
}