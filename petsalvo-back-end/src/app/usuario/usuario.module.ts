import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EncryptUtils } from "src/utils/encrypt.utils";
import { UsuarioEntity } from "./entities/usuario.entity";
import { UsuarioService } from "./usuario.service";
import { ImagemUsuarioModule } from "../imagem/imagem-usuario/imagem-usuario.module";

@Module({
    imports: [TypeOrmModule.forFeature([UsuarioEntity]), forwardRef(() => ImagemUsuarioModule)],
    providers: [UsuarioService, EncryptUtils],
    exports: [UsuarioService]
})
export class UsuarioModule { }