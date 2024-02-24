import { Column, PrimaryGeneratedColumn } from "typeorm";

export class ImagemEntityBase {

    @PrimaryGeneratedColumn()
    idImagem: number;

    @Column()
    url: string;
}