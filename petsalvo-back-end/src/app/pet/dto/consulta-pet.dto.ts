import { ApiProperty } from "@nestjs/swagger";
import { ConsultaImagemDTO } from "src/app/imagem/dto/consulta-imagem.dto";
import { PetDTO } from "./pet.dto";

export class ConsultaPetDTO extends PetDTO {

    @ApiProperty()
    idPet: number;

    @ApiProperty({ type: [ConsultaImagemDTO] })
    imagens?: ConsultaImagemDTO[];
}