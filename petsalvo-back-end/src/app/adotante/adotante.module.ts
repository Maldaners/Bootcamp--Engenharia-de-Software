import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EnderecoModule } from "../endereco/endereco.module";
import { FormularioModule } from "../formulario/formulario.module";
import { ImagemUsuarioModule } from "../imagem/imagem-usuario/imagem-usuario.module";
import { ProcessoAdocaoModule } from "../processo-adocao/processo-adocao.module";
import { UsuarioModule } from "../usuario/usuario.module";
import { AdotanteController } from "./adotante.controller";
import { AdotanteService } from "./adotante.service";
import { AdotanteEntity } from "./entitites/adotante.entity";

@Module({
    imports: [TypeOrmModule.forFeature([AdotanteEntity]), UsuarioModule, EnderecoModule, ImagemUsuarioModule, forwardRef(() => FormularioModule), forwardRef(() => ProcessoAdocaoModule)],
    controllers: [AdotanteController],
    providers: [AdotanteService],
    exports: [AdotanteService]
})
export class AdotanteModule { }