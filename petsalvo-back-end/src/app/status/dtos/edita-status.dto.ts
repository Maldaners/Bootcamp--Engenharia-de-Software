import { ApiProperty } from "@nestjs/swagger";
import { StatusDTO } from "./status.dto";

export class EditaStatusDTO extends StatusDTO {

    @ApiProperty()
    idStatus: number;
}