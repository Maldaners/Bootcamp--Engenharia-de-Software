import { ApiProperty } from "@nestjs/swagger";

export class FormularioRespostaDTO {

    @ApiProperty()
    idFormularioResposta: number;

    @ApiProperty()
    texto: string;
}