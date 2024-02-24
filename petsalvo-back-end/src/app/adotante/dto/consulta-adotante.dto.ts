import { ApiProperty } from "@nestjs/swagger";
import { ConsultaUsuarioDTO } from "src/app/usuario/dto/consulta-usuario.dto";
import { AdotanteDTO } from "./adotante.dto";

export class ConsultaAdotanteDTO extends AdotanteDTO {

    @ApiProperty()
    idAdotante: number;

    @ApiProperty({ type: ConsultaUsuarioDTO })
    usuario: ConsultaUsuarioDTO;
}