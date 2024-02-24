import { AdotanteEntity } from "src/app/adotante/entitites/adotante.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { FormularioRespostaEntity } from "./formulario-padrao/formulario-resposta.entity";

@Entity("formulario_resposta_adotante")
export class FormularioRespostaAdotanteEntity {

    @PrimaryGeneratedColumn()
    idFormularioRespostaAdotante: number;

    // Relação - Adotante
    @ManyToOne(() => AdotanteEntity, { cascade: true, nullable: false })
    @JoinColumn({ name: 'idAdotante' })
    adotante: AdotanteEntity;

    @Column()
    idAdotante: number;

    // Relação - Formulario Resposta
    @ManyToOne(() => FormularioRespostaEntity, { cascade: true, nullable: false })
    @JoinColumn({ name: 'idFormularioResposta' })
    formularioResposta: FormularioRespostaEntity;

    @Column()
    idFormularioResposta: number;
}