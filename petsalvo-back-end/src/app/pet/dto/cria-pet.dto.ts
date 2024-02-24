import { ApiProperty } from "@nestjs/swagger";
import { PetDTO } from "./pet.dto";

export class CriaPetDTO extends PetDTO {

    @ApiProperty()
    idPet: number;

    @ApiProperty()
    idOng: number;
}