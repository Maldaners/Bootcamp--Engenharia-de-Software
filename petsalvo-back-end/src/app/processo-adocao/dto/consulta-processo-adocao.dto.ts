import { ApiProperty } from "@nestjs/swagger";
import { ConsultaPetOngDTO } from "src/app/pet/dto/consulta-pet-ong.dto";
import { ProcessoAdocaoDTO } from "./processo-adocao.dto";
import { ConsultaPetDTO } from "src/app/pet/dto/consulta-pet.dto";

export class ConsultaProcessoAdocaoDTO extends ProcessoAdocaoDTO {

    idProcessoAdocao?: number;

    @ApiProperty()
    idPet: number;

    @ApiProperty({ type: ConsultaPetDTO })
    pet: ConsultaPetDTO;

    @ApiProperty()
    dataCriacao: Date;

    @ApiProperty()
    dataAtualizacao: Date;

}