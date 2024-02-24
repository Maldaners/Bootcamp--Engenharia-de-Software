import { PetEntity } from "src/app/pet/entities/pet.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { ImagemEntityBase } from "../../entities/imagem.entity.base";

@Entity("imagem_pet")
export class ImagemPetEntity extends ImagemEntityBase {

    @ManyToOne(() => PetEntity, (p) => p.imagens, { cascade: true, nullable: false })
    @JoinColumn({ name: 'idPet' })
    pet: PetEntity;

    @Column()
    idPet: number;
}   