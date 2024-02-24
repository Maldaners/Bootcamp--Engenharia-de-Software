import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OngEntity } from "../../ong/entities/ong.entity";
import { TipoChave } from "../enum/tipo-chave.enum";

@Entity("pix")
export class PixEntity {

    @PrimaryGeneratedColumn()
    idPix: number;

    @Column()
    tipoChave: TipoChave;

    @Column({ length: 255 })
    chave: string;

    // Relação - ONG - Status
    @ManyToOne(() => OngEntity, (o) => o.status, { cascade: true, nullable: false })
    @JoinColumn({ name: 'idOng' })
    ong: OngEntity;

    @Column()
    idOng: number;
}