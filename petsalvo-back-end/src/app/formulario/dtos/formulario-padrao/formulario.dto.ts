import { ApiProperty } from "@nestjs/swagger";
import { FormularioPerguntaDTO } from "./formulario-pergunta.dto";

export class FormularioDTO {

    @ApiProperty()
    idFormulario: number;

    @ApiProperty()
    titulo: string;

    @ApiProperty()
    descricao: string;

    @ApiProperty({ type: [FormularioPerguntaDTO] })
    perguntas: FormularioPerguntaDTO[]
}