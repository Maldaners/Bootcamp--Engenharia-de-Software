import { EnderecoEntity } from "src/app/endereco/entities/endereco.entity";
import { FormularioRespostaAdotanteEntity } from "src/app/formulario/entities/formulario-resposta-adotante.entity";
import { ProcessoAdocaoEntity } from "src/app/processo-adocao/entities/processo-adocao.entity";
import { UsuarioEntity } from "src/app/usuario/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("adotante")
export class AdotanteEntity {

    @PrimaryGeneratedColumn()
    idAdotante: number;

    @Column('date')
    dataNasc: Date;

    @Column({ length: 11 })
    cpf: string;

    // Relação - Usuário
    @OneToOne(() => UsuarioEntity, { cascade: true, nullable: false })
    @JoinColumn({ name: 'idUsuario' })
    usuario: UsuarioEntity;

    @Column()
    idUsuario: number;

    // Relação - Endereço - Usuário
    @OneToOne(() => EnderecoEntity, (e) => e.usuario)
    endereco: EnderecoEntity;

    // Relação - Respostas do formulário - Adotante
    @ManyToMany(() => FormularioRespostaAdotanteEntity)
    formulario: FormularioRespostaAdotanteEntity[]

    // Relação - ONG - Processo de adoção
    @OneToMany(() => ProcessoAdocaoEntity, (p) => p.adotante)
    processoAdocao: ProcessoAdocaoEntity[];
}