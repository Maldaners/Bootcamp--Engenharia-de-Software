import { Column } from "typeorm";

export abstract class AutenticacaoEntity {

    @Column({ length: 255 })
    email: string;

    @Column({ length: 255 })
    senha: string;
}