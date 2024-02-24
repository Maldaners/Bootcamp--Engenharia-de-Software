import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PetModule } from "src/app/pet/pet.module";
import { ImagemPetEntity } from "./entities/imagem-pet.entity";
import { ImagemPetService } from "./imagem-pet.service";

@Module({
    imports: [TypeOrmModule.forFeature([ImagemPetEntity]), forwardRef(() => PetModule)],
    providers: [ImagemPetService],
    exports: [ImagemPetService]
})
export class ImagemPetModule { }