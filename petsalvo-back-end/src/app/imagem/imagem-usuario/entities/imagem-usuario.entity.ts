import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { ImagemEntityBase } from "../../entities/imagem.entity.base";
import { UsuarioEntity } from "src/app/usuario/entities/usuario.entity";

@Entity("imagem_usuario")
export class ImagemUsuarioEntity extends ImagemEntityBase {

    @OneToOne(() => UsuarioEntity, { cascade: true, nullable: false })
    @JoinColumn({ name: 'idUsuario' })
    usuario: UsuarioEntity;

    @Column()
    idUsuario: number;
}