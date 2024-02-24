import { UsuarioEntity } from "src/app/usuario/entities/usuario.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("endereco")
export class EnderecoEntity {

    @PrimaryGeneratedColumn()
    idEndereco: number;

    @Column({ length: 8 })
    cep: string;

    @Column({ length: 255 })
    rua: string;

    @Column({ length: 255 })
    bairro: string;

    @Column('int')
    numero: number;

    @Column({ length: 255 })
    cidade: string;

    @Column({ length: 255 })
    estado: string;

    @Column({ length: 255 })
    complemento: string;

    // Relação - Usuário
    @OneToOne(() => UsuarioEntity, { cascade: true, nullable: false })
    @JoinColumn({ name: 'idUsuario' })
    usuario: UsuarioEntity;

    @Column()
    idUsuario: number;

}