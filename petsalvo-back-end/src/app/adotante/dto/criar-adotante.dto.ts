import { ApiProperty } from "@nestjs/swagger";
import { FormularioRespostaAdotanteDTO } from "src/app/formulario/dtos/formulario-resposta-adotante.dto";
import { AdotanteDTO } from "./adotante.dto";

export class CriarAdotanteDTO extends AdotanteDTO {

    @ApiProperty({ type: [FormularioRespostaAdotanteDTO], required: false, nullable: true })
    formulario?: FormularioRespostaAdotanteDTO[];

}