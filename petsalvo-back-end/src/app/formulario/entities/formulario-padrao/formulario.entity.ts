import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FormularioPerguntaEntity } from "./formulario-pergunta.entity";

@Entity("formulario")
export class FormularioEntity {

    @PrimaryGeneratedColumn()
    idFormulario: number;

    @Column({ length: 255 })
    titulo: string;

    @Column({ length: 255 })
    descricao: string;

    //Relação - Pergunta - Formulario
    @OneToMany(() => FormularioPerguntaEntity, (p) => p.formulario)
    formularioPergunta: FormularioPerguntaEntity;
}