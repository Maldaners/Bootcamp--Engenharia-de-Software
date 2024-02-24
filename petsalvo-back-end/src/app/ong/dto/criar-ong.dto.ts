import { ApiProperty } from "@nestjs/swagger";
import { PixDTO } from "src/app/pix/dtos/pix.dto";
import { StatusDTO } from "src/app/status/dtos/status.dto";
import { OngDTO } from "./ong.dto";

export class CriarOngDTO extends OngDTO {

    @ApiProperty({ type: [PixDTO], required: false, nullable: true })
    pix?: PixDTO[];

    @ApiProperty({ type: [StatusDTO], required: false, nullable: true })
    status?: StatusDTO[];
}