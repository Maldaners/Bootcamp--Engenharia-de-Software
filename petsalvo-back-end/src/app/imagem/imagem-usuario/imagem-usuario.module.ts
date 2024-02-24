import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ImagemUsuarioEntity } from "./entities/imagem-usuario.entity";
import { ImagemUsuarioService } from "./imagem-usuario.service";

@Module({
    imports: [TypeOrmModule.forFeature([ImagemUsuarioEntity])],
    providers: [ImagemUsuarioService],
    exports: [ImagemUsuarioService]
})
export class ImagemUsuarioModule { }