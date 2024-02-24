import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ProcessoAdocaoDTO } from "src/app/processo-adocao/dto/processo-adocao.dto";

export class NotificacaoDTO {

    @ApiProperty()
    @Type(() => ProcessoAdocaoDTO)
    processoAdocao: ProcessoAdocaoDTO;

    @ApiProperty()
    visualizada: boolean;

}