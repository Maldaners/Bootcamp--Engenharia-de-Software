import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OngEntity } from "../../ong/entities/ong.entity";

@Entity("status")
export class StatusEntity {

    @PrimaryGeneratedColumn()
    idStatus: number;

    @Column({ length: 255 })
    nome: string;

    // Relação - ONG - Status
    @ManyToOne(() => OngEntity, (o) => o.status, { cascade: true, nullable: false })
    @JoinColumn({ name: 'idOng' })
    ong: OngEntity;

    @Column()
    idOng: number;
}