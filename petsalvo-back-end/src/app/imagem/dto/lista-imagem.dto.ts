import { ApiProperty } from "@nestjs/swagger";

export class ListaImagemDTO {

    @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
    imagens: Express.Multer.File[];
}