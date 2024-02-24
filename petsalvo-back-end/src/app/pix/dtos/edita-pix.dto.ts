import { ApiProperty } from "@nestjs/swagger";
import { PixDTO } from "./pix.dto";

export class EditaPixDTO extends PixDTO {

    @ApiProperty()
    idPix: number;
}