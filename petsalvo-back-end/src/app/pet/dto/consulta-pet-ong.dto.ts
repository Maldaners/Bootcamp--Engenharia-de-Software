import { ApiProperty } from "@nestjs/swagger";
import { ConsultaImagemDTO } from "src/app/imagem/dto/consulta-imagem.dto";
import { PetDTO } from "./pet.dto";
import { ConsultaOngDTO } from "src/app/ong/dto/consulta-ong.dto";
import { ConsultaPetDTO } from "./consulta-pet.dto";

export class ConsultaPetOngDTO extends ConsultaPetDTO {

    @ApiProperty({ type: ConsultaOngDTO })
    ong: ConsultaOngDTO;
}