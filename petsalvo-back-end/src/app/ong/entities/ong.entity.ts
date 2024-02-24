import { EnderecoEntity } from "src/app/endereco/entities/endereco.entity";
import { PetEntity } from "src/app/pet/entities/pet.entity";
import { PixEntity } from "src/app/pix/entities/pix.entity";
import { ProcessoAdocaoEntity } from "src/app/processo-adocao/entities/processo-adocao.entity";
import { UsuarioEntity } from "src/app/usuario/entities/usuario.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { StatusEntity } from "../../status/entities/status.entity";

@Entity("ong")
export class OngEntity {

    @PrimaryGeneratedColumn()
    idOng: number;

    @Column({ length: 255, nullable: true })
    site: string;

    @Column({ length: 14 })
    cnpj: string;

    // Relação - Usuário
    @OneToOne(() => UsuarioEntity, { cascade: true, nullable: false })
    @JoinColumn({ name: 'idUsuario' })
    usuario: UsuarioEntity;

    @Column()
    idUsuario: number;

    // Relação - Endereço - Usuário
    @OneToOne(() => EnderecoEntity, (e) => e.usuario)
    endereco: EnderecoEntity;

    // Relação - Status - ONG
    @OneToMany(() => StatusEntity, (s) => s.ong)
    status: StatusEntity[];

    // Relação - Pix - ONG
    @OneToMany(() => PixEntity, (p) => p.ong)
    pix: PixEntity[];

    // Relação - Pet - ONG
    @OneToMany(() => PetEntity, (p) => p.ong)
    pet: PetEntity[];

    // Relação - Processo de adoção - ONG
    @OneToMany(() => ProcessoAdocaoEntity, (p) => p.ong)
    processoAdocao: ProcessoAdocaoEntity[];
}