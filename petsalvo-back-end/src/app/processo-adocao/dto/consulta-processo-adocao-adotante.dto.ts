import { ApiProperty } from "@nestjs/swagger";
import { ConsultaOngDTO } from "src/app/ong/dto/consulta-ong.dto";
import { ConsultaProcessoAdocaoDTO } from "./consulta-processo-adocao.dto";

export class ConsultaProcessoAdocaoAdotanteDTO extends ConsultaProcessoAdocaoDTO {

    @ApiProperty()
    idOng: number;

    @ApiProperty({ type: ConsultaOngDTO })
    ong: ConsultaOngDTO;

}