import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdotanteModule } from "../adotante/adotante.module";
import { NotificacaoModule } from "../notificacao/notificacao.module";
import { OngModule } from "../ong/ong.module";
import { PetModule } from "../pet/pet.module";
import { ProcessoAdocaoEntity } from "./entities/processo-adocao.entity";
import { ProcessoAdocaoController } from "./processo-adocao.controller";
import { ProcessoAdocaoService } from "./processo-adocao.service";

@Module({
    imports: [TypeOrmModule.forFeature([ProcessoAdocaoEntity]), forwardRef(() => AdotanteModule), forwardRef(() => OngModule), forwardRef(() => PetModule), forwardRef(() => NotificacaoModule)],
    controllers: [ProcessoAdocaoController],
    providers: [ProcessoAdocaoService],
    exports: [ProcessoAdocaoService]
})
export class ProcessoAdocaoModule { }