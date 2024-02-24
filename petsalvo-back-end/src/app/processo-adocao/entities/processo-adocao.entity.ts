import { AdotanteEntity } from "src/app/adotante/entitites/adotante.entity";
import { NotificacaoEntity } from "src/app/notificacao/entities/notificacao.entity";
import { OngEntity } from "src/app/ong/entities/ong.entity";
import { PetEntity } from "src/app/pet/entities/pet.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TipoStatusProcessoAdocao } from "../enums/tipo-status-processo-adocao.enum";

@Entity("processo_de_adocao")
export class ProcessoAdocaoEntity {

    @PrimaryGeneratedColumn()
    idProcessoAdocao: number;

    @CreateDateColumn()
    dataCriacao: Date;

    @UpdateDateColumn()
    dataAtualizacao: Date;

    @Column()
    status: TipoStatusProcessoAdocao;

    // Relação - Processo de adoção - ONG
    @ManyToOne(() => OngEntity, (o) => o.processoAdocao, { cascade: true, nullable: false })
    @JoinColumn({ name: 'idOng' })
    ong: OngEntity;

    @Column()
    idOng: number;

    // Relação - Processo de adoção - Pet
    @ManyToOne(() => PetEntity, (p) => p.processoAdocao, { cascade: true, nullable: false })
    @JoinColumn({ name: 'idPet' })
    pet: PetEntity;

    @Column()
    idPet: number;

    // Relação - Processo de adoção - Adotante
    @ManyToOne(() => AdotanteEntity, (a) => a.processoAdocao, { cascade: true, nullable: false })
    @JoinColumn({ name: 'idAdotante' })
    adotante: AdotanteEntity;

    @Column()
    idAdotante: number;

    // Relação - Processo de adoção - Notificação
    @OneToMany(() => NotificacaoEntity, (n) => n.processoAdocao)
    notificacao: NotificacaoEntity[];
}