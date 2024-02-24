import { Inject, forwardRef } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as path from "path";
import { INTERCEPTADOR_IMAGEM_PET } from "src/app/pet/pet.controller";
import { PetService } from "src/app/pet/pet.service";
import { DIRETORIO_IMAGENS_PET } from "src/app/utils/diretorio.utils";
import { CustomHttpException } from "src/utils/exceptions/custom-http-exception.exception";
import { FileUtils } from "src/utils/file.utils";
import { Repository } from "typeorm";
import { ListaImagemDTO } from "../dto/lista-imagem.dto";
import { IMAGEM_NAO_ANEXADA } from "../responses/imagem.responses";
import { ImagemPetEntity } from "./entities/imagem-pet.entity";
import { IMAGEM_NAO_ENCONTRADA_COM_ID_DO_PET_OU_ID_DA_IMAGEM, NENHUMA_IMAGEM_ENCONTRADA_COM_ID_DO_PET } from "./responses/imagem-pet.responses";
import { PET_NAO_ENCONTRADO_COM_ID } from "src/app/pet/responses/pet.responses";

export class ImagemPetService {

    constructor(
        @InjectRepository(ImagemPetEntity) private model: Repository<ImagemPetEntity>,
        @Inject(forwardRef(() => PetService)) private readonly petService: PetService
    ) { }

    public async criar(idUsuario: number, idPet: number, imagensDto: ListaImagemDTO, imagens: Express.Multer.File[]): Promise<boolean> {
        await this.validarImagemAnexada(imagens);
        await this.validarPetExistente(idUsuario, idPet, imagens);

        await imagens[INTERCEPTADOR_IMAGEM_PET].map(async (imagem: Express.Multer.File) => {
            const url = path.join(imagem.destination, imagem.filename);
            await this.model.save({ url: url, idPet: idPet });
        });

        return true;
    }

    //TODO: Solução temporária. Procurar lançar exceção através do inteceptador de imagens
    private async validarPetExistente(idUsuario: number, idPet: number, imagens: Express.Multer.File[]) {
        try {
            await this.petService.consultarPorId(idUsuario, idPet);
        } catch (error) {
            const fileUtils = new FileUtils();

            await imagens[INTERCEPTADOR_IMAGEM_PET].map(async (imagem: Express.Multer.File) => {
                const url = path.join(imagem.destination, imagem.filename);

                await fileUtils.deleteFile(url);
                await fileUtils.deleteDirectoryOfFileIfEmpty(url);
            });

            throw new CustomHttpException(PET_NAO_ENCONTRADO_COM_ID);
        }
    }

    private async validarImagemAnexada(imagens: Express.Multer.File[]) {
        try {
            await imagens[INTERCEPTADOR_IMAGEM_PET].map;
        } catch (error) {
            throw new CustomHttpException(IMAGEM_NAO_ANEXADA);
        }
    }

    private async retornarImagemPorIdPetEIdImagem(idPet: number, idImagem: number) {
        const ImagemEntity = await this.model.findOne({
            where: { idPet: idPet, idImagem: idImagem }
        });

        if (!ImagemEntity)
            throw new CustomHttpException(IMAGEM_NAO_ENCONTRADA_COM_ID_DO_PET_OU_ID_DA_IMAGEM);

        return ImagemEntity;
    }

    public async consultarPorId(idUsuario: number, idPet: number, idImagem: number): Promise<ImagemPetEntity> {
        await this.petService.consultarPorId(idUsuario, idPet);

        return await this.retornarImagemPorIdPetEIdImagem(idPet, idImagem);
    }

    public async consultarPorIdOng(idOng: number, idPet: number, idImagem: number): Promise<ImagemPetEntity> {
        await this.petService.consultarPorIdOng(idOng, idPet);

        return await this.retornarImagemPorIdPetEIdImagem(idPet, idImagem);
    }

    private async retornarImagensPorIdPet(idPet: number) {
        const listaImagemEntity = await this.model.find({
            where: { idPet: idPet }
        });

        if (listaImagemEntity.length == 0)
            throw new CustomHttpException(NENHUMA_IMAGEM_ENCONTRADA_COM_ID_DO_PET);

        return listaImagemEntity;
    }

    public async consultarTodas(idUsuario: number, idPet: number): Promise<ImagemPetEntity[]> {
        await this.petService.consultarPorId(idUsuario, idPet);

        return this.retornarImagensPorIdPet(idPet);
    }

    public async consultarTodasPorIdOng(idOng: number, idPet: number): Promise<ImagemPetEntity[]> {
        await this.petService.consultarPorIdOng(idOng, idPet);

        return this.retornarImagensPorIdPet(idPet);
    }

    private async deletarImagemPet(idPet: number, imagemPetEntity: ImagemPetEntity) {
        await this.model.delete({ idPet: idPet, idImagem: imagemPetEntity.idImagem });

        const fileUtils = new FileUtils();
        await fileUtils.deleteFile(imagemPetEntity.url);
        await fileUtils.deleteDirectoryOfFileIfEmpty(imagemPetEntity.url);
    }

    public async deletarTodas(idPet: number) {
        await this.model.delete({ idPet: idPet });

        const fileUtils = new FileUtils();
        await fileUtils.deleteFile(DIRETORIO_IMAGENS_PET + await fileUtils.getSeparate() + idPet);
    }

    public async deletar(idUsuario: number, idPet: number, idImagem: number): Promise<boolean> {
        const imagemPetEntity = await this.consultarPorId(idUsuario, idPet, idImagem);
        await this.deletarImagemPet(idPet, imagemPetEntity);

        return true;
    }
}