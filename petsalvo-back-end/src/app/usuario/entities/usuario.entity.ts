import { AutenticacaoEntity } from "src/app/autenticacao/entities/autenticacao.entity";
import { EnderecoEntity } from "src/app/endereco/entities/endereco.entity";
import { ImagemUsuarioEntity } from "src/app/imagem/imagem-usuario/entities/imagem-usuario.entity";
import { NotificacaoEntity } from "src/app/notificacao/entities/notificacao.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { TipoUsuario } from "../enum/tipoUsuario.enum";

@Entity("usuario")
export class UsuarioEntity extends AutenticacaoEntity {

    @PrimaryGeneratedColumn()
    idUsuario: number;

    @Column({ length: 255 })
    nome: string;

    @Column({ length: 11 })
    telefone: string;

    @Column()
    tipoUsuario: TipoUsuario;

    @Column()
    termos: boolean;

    // Relação - Usuário - Endereço
    @OneToOne(() => EnderecoEntity, (e) => e.usuario)
    endereco: EnderecoEntity;

    // Relação - Usuário - Imagem
    @OneToOne(() => ImagemUsuarioEntity, (i) => i.usuario)
    imagem: ImagemUsuarioEntity;

    // Relação - Usuário - Notificação
    @OneToMany(() => NotificacaoEntity, (n) => n.usuario)
    notificacao: NotificacaoEntity;
}