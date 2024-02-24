import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FormularioRespostaEntity } from "./formulario-resposta.entity";
import { FormularioEntity } from "./formulario.entity";

@Entity("formulario_pergunta")
export class FormularioPerguntaEntity {

    @PrimaryGeneratedColumn()
    idFormularioPergunta: number;

    @Column({ length: 255 })
    texto: string;

    // Relação - Formulário
    @ManyToOne(() => FormularioEntity, { cascade: true, nullable: false })
    @JoinColumn({ name: 'idFormulario' })
    formulario: FormularioEntity;

    @Column()
    idFormulario: number;

    // Relação - Resposta - Pergunta
    @OneToMany(() => FormularioRespostaEntity, (r) => r.formularioPergunta)
    formularioResposta: FormularioRespostaEntity;
}