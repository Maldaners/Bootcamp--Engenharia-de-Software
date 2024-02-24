import { ApiProperty } from "@nestjs/swagger";

export class LoginDTO {

    @ApiProperty()
    accessToken: string;

    @ApiProperty()
    tipoUsuario: string;
}