import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdotanteModule } from "../adotante/adotante.module";
import { OngModule } from "../ong/ong.module";
import { NotificacaoEntity } from "./entities/notificacao.entity";
import { NotificacaoController } from "./notificacao.controller";
import { NotificacaoService } from "./notificacao.service";


@Module({
    imports: [TypeOrmModule.forFeature([NotificacaoEntity]), forwardRef(() => AdotanteModule), forwardRef(() => OngModule)],
    controllers: [NotificacaoController],
    providers: [NotificacaoService],
    exports: [NotificacaoService]
})
export class NotificacaoModule { }