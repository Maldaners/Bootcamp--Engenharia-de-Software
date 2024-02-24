import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { FormularioPerguntaEntity } from "./formulario-pergunta.entity";

@Entity("formulario_resposta")
export class FormularioRespostaEntity {

    @PrimaryGeneratedColumn()
    idFormularioResposta: number;

    @Column({ length: 255 })
    texto: string;

    // Relação - Formulário
    @ManyToOne(() => FormularioPerguntaEntity, { cascade: true, nullable: false })
    @JoinColumn({ name: 'idFormularioPergunta' })
    formularioPergunta: FormularioPerguntaEntity;

    @Column()
    idFormularioPergunta: number;
}