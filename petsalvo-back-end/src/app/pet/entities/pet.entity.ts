import { ImagemPetEntity } from "src/app/imagem/imagem-pet/entities/imagem-pet.entity";
import { OngEntity } from "src/app/ong/entities/ong.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SexoPet } from "../enum/sexo-pet.enum";
import { TipoPet } from "../enum/tipo-pet.enum";
import { ProcessoAdocaoEntity } from "src/app/processo-adocao/entities/processo-adocao.entity";

@Entity("pet")
export class PetEntity {

    @PrimaryGeneratedColumn()
    idPet: number;

    @Column({ length: 255 })
    nome: string;

    @Column('int')
    idade: number;

    @Column('int')
    tipo: TipoPet;

    @Column({ length: 1 })
    sexo: SexoPet;

    @Column({ length: 1000 })
    descricao: string;

    @Column()
    adotado: boolean;

    // Relação - Pet - ONG
    @ManyToOne(() => OngEntity, (o) => o.pet, { cascade: true, nullable: false })
    @JoinColumn({ name: 'idOng' })
    ong: OngEntity;

    @Column()
    idOng: number;

    // Relação - Pet - Imagem
    @OneToMany(() => ImagemPetEntity, (i) => i.pet)
    imagens: ImagemPetEntity[];

    // Relação - ONG - Processo de adoção
    @OneToMany(() => ProcessoAdocaoEntity, (p) => p.pet)
    processoAdocao: ProcessoAdocaoEntity[];
}