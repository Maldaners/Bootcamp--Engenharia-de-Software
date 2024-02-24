import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OngEntity } from "src/app/ong/entities/ong.entity";
import { OngController } from "src/app/ong/ong.controller";
import { OngService } from "src/app/ong/ong.service";
import { EnderecoModule } from "../endereco/endereco.module";
import { ImagemUsuarioModule } from "../imagem/imagem-usuario/imagem-usuario.module";
import { PetModule } from "../pet/pet.module";
import { PixModule } from "../pix/pix.module";
import { ProcessoAdocaoModule } from "../processo-adocao/processo-adocao.module";
import { StatusModule } from "../status/status.module";
import { UsuarioModule } from "../usuario/usuario.module";

@Module({
    imports: [TypeOrmModule.forFeature([OngEntity]), UsuarioModule, EnderecoModule, ImagemUsuarioModule, forwardRef(() => StatusModule), forwardRef(() => PixModule), forwardRef(() => PetModule), forwardRef(() => ProcessoAdocaoModule)],
    controllers: [OngController],
    providers: [OngService],
    exports: [OngService]
})
export class OngModule { }