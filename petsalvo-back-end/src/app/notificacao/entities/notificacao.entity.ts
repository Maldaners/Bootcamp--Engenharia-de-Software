import { ProcessoAdocaoEntity } from "src/app/processo-adocao/entities/processo-adocao.entity";
import { TipoStatusProcessoAdocao } from "src/app/processo-adocao/enums/tipo-status-processo-adocao.enum";
import { UsuarioEntity } from "src/app/usuario/entities/usuario.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("notificacao")
export class NotificacaoEntity {

    @PrimaryGeneratedColumn()
    idNotificacao: number;

    @Column()
    visualizada: boolean;

    @Column()
    statusProcessoAdocaoNotificado: TipoStatusProcessoAdocao;

    @CreateDateColumn()
    dataCriacao: Date;

    @UpdateDateColumn({ nullable: true })
    dataVisualizacao: Date;

    // Relação - Usuário
    @ManyToOne(() => UsuarioEntity, { cascade: true, nullable: false })
    @JoinColumn({ name: 'idUsuario' })
    usuario: UsuarioEntity;

    @Column()
    idUsuario: number;

    // Relação - Processo de adocão
    @ManyToOne(() => ProcessoAdocaoEntity, { cascade: true, nullable: true, onDelete: "SET NULL" })
    @JoinColumn({ name: 'idProcessoAdocao' })
    processoAdocao: ProcessoAdocaoEntity;

    @Column({ nullable: true })
    idProcessoAdocao: number;
}