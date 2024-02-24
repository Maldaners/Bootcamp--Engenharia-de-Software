import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ConsultaImagemDTO } from "src/app/imagem/dto/consulta-imagem.dto";
import { UsuarioDTO } from "./usuario.dtos";

export class ConsultaUsuarioDTO extends UsuarioDTO {

    idUsuario?: number;

    @ApiProperty()
    @Type(() => ConsultaImagemDTO)
    imagem: ConsultaImagemDTO;

}