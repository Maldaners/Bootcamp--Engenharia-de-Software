import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdotanteModule } from "../adotante/adotante.module";
import { FormularioRespostaEntity } from "./entities/formulario-padrao/formulario-resposta.entity";
import { FormularioEntity } from "./entities/formulario-padrao/formulario.entity";
import { FormularioRespostaAdotanteEntity } from "./entities/formulario-resposta-adotante.entity";
import { FormularioController } from "./formulario.controller";
import { FormularioService } from "./formulario.service";

@Module({
    imports: [TypeOrmModule.forFeature([FormularioEntity, FormularioRespostaEntity, FormularioRespostaAdotanteEntity]), forwardRef(() => AdotanteModule)],
    controllers: [FormularioController],
    providers: [FormularioService],
    exports: [FormularioService]
})
export class FormularioModule { }