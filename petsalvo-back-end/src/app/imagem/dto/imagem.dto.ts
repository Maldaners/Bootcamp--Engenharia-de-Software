import { ApiProperty } from "@nestjs/swagger";

export class ImagemDTO {

    @ApiProperty({ type: 'string', format: 'binary', name: 'file' })
    url: Express.Multer.File;

}