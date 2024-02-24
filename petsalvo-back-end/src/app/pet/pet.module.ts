import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ImagemPetModule } from "../imagem/imagem-pet/imagem-pet.module";
import { OngModule } from "../ong/ong.module";
import { PetEntity } from "./entities/pet.entity";
import { PetController } from "./pet.controller";
import { PetService } from "./pet.service";
import { ProcessoAdocaoModule } from "../processo-adocao/processo-adocao.module";

@Module({
    imports: [TypeOrmModule.forFeature([PetEntity]), forwardRef(() => OngModule), forwardRef(() => ImagemPetModule), forwardRef(() => ProcessoAdocaoModule)],
    controllers: [PetController],
    providers: [PetService],
    exports: [PetService]
})
export class PetModule { }