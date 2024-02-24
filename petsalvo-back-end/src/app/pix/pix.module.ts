import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OngModule } from "../ong/ong.module";
import { PixEntity } from "./entities/pix.entity";
import { PixController } from "./pix.controller";
import { PixService } from "./pix.service";

@Module({
    imports: [TypeOrmModule.forFeature([PixEntity]), forwardRef(() => OngModule)],
    controllers: [PixController],
    providers: [PixService],
    exports: [PixService]
})
export class PixModule { }