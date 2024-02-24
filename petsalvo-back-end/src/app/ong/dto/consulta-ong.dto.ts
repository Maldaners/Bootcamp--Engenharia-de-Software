import { ApiProperty } from "@nestjs/swagger";
import { PixDTO } from "src/app/pix/dtos/pix.dto";
import { ConsultaUsuarioDTO } from "src/app/usuario/dto/consulta-usuario.dto";
import { StatusDTO } from "../../status/dtos/status.dto";
import { OngDTO } from "./ong.dto";

export class ConsultaOngDTO extends OngDTO {

    @ApiProperty()
    idOng: number;

    @ApiProperty({ type: ConsultaUsuarioDTO })
    usuario: ConsultaUsuarioDTO;

    @ApiProperty({ type: [StatusDTO] })
    status?: StatusDTO[];

    @ApiProperty({ type: [PixDTO] })
    pix?: PixDTO[];

}