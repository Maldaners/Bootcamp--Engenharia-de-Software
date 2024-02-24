import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OngModule } from "../ong/ong.module";
import { StatusEntity } from "./entities/status.entity";
import { StatusController } from "./status.controller";
import { StatusService } from "./status.service";

@Module({
    imports: [TypeOrmModule.forFeature([StatusEntity]), forwardRef(() => OngModule)],
    controllers: [StatusController],
    providers: [StatusService],
    exports: [StatusService]
})
export class StatusModule { }