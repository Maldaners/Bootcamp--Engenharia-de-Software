import { ApiProperty } from "@nestjs/swagger";

export class ConsultaImagemDTO {

    idImagem?: number;

    @ApiProperty()
    url: string;
}