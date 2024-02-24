import { ApiProperty } from "@nestjs/swagger";

export class EditaFormularioRespostaAdotanteDTO {

    @ApiProperty()
    idFormularioPergunta: number;

    @ApiProperty()
    idFormularioResposta: number;
}