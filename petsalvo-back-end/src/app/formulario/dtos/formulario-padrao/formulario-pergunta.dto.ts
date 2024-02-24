import { ApiProperty } from "@nestjs/swagger";
import { FormularioRespostaDTO } from "./formulario-resposta.dto";

export class FormularioPerguntaDTO {

    @ApiProperty()
    idFormularioPergunta: number;

    @ApiProperty()
    texto: string;

    @ApiProperty()
    resposta: FormularioRespostaDTO;
}