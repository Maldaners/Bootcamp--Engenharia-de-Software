import { Inject, forwardRef } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CustomHttpException } from "src/utils/exceptions/custom-http-exception.exception";
import { Repository } from "typeorm";
import { ImagemPetService } from "../imagem/imagem-pet/imagem-pet.service";
import { OngService } from "../ong/ong.service";
import { ProcessoAdocaoService } from "../processo-adocao/processo-adocao.service";
import { ConsultaPetOngDTO } from "./dto/consulta-pet-ong.dto";
import { PetDTO } from "./dto/pet.dto";
import { PetEntity } from "./entities/pet.entity";
import { SexoPet } from "./enum/sexo-pet.enum";
import { TipoPet } from "./enum/tipo-pet.enum";
import { NENHUM_PET_CADASTRADO_PARA_ESTA_ONG, NENHUM_PET_NAO_ADOTADO_CADASTRADO, PET_NAO_ENCONTRADO_COM_ID, VALOR_SEXO_PET_INVALIDO, VALOR_TIPO_PET_INVALIDO } from "./responses/pet.responses";
import { CriaPetDTO } from "./dto/cria-pet.dto";

export class PetService {

    constructor(
        @InjectRepository(PetEntity) private model: Repository<PetEntity>,
        @Inject(forwardRef(() => OngService)) private readonly ongService: OngService,
        @Inject(forwardRef(() => ImagemPetService)) private readonly imagemPetService: ImagemPetService,
        @Inject(forwardRef(() => ProcessoAdocaoService)) private readonly processoAdocaoService: ProcessoAdocaoService
    ) { }

    public async criar(idUsuario: number, petDto: PetDTO): Promise<CriaPetDTO> {
        const ongDto = await this.ongService.consultarPorId(idUsuario);
        await this.validarTipoPet(petDto.tipo);
        await this.validarValorSexo(petDto.sexo);

        return await this.model.save({ ...petDto, idOng: ongDto.idOng });;
    }

    private async validarTipoPet(tipo: number) {
        if (tipo != TipoPet.CACHORRO && tipo != TipoPet.GATO)
            throw new CustomHttpException(VALOR_TIPO_PET_INVALIDO);
    }

    private async validarValorSexo(sexo: string) {
        if (sexo.toUpperCase() != SexoPet.MACHO.toUpperCase() && sexo.toUpperCase() != SexoPet.FEMEA.toUpperCase())
            throw new CustomHttpException(VALOR_SEXO_PET_INVALIDO);
    }

    private async retornarPetDaOng(idOng: number, idPet: number): Promise<PetEntity> {
        const petEntity = await this.model.findOne({
            where: { idPet: idPet, idOng: idOng },
            relations: { imagens: true, ong: { usuario: { imagem: true }, endereco: true } },
            order: { imagens: { idImagem: "ASC" } }
        });

        if (!petEntity)
            throw new CustomHttpException(PET_NAO_ENCONTRADO_COM_ID);

        return petEntity;
    }

    public async consultarPorIdOng(idOng: number, idPet: number): Promise<ConsultaPetOngDTO> {
        await this.ongService.consultarPorIdOng(idOng);

        return await this.retornarPetDaOng(idOng, idPet);
    }

    public async consultarPorId(idUsuario: number, idPet: number): Promise<ConsultaPetOngDTO> {
        const ongDto = await this.ongService.consultarPorId(idUsuario);

        return await this.retornarPetDaOng(ongDto.idOng, idPet);
    }

    public async consultarTodosNaoAdotados(): Promise<ConsultaPetOngDTO[]> {
        const listaPetEntity = await this.model.find({
            where: { adotado: false },
            relations: { imagens: true, ong: { usuario: { imagem: true }, endereco: true } },
            order: { imagens: { idImagem: "ASC" } }
        });

        if (listaPetEntity.length == 0)
            throw new CustomHttpException(NENHUM_PET_NAO_ADOTADO_CADASTRADO);

        return listaPetEntity;
    }

    public async consultarTodos(idOng: number): Promise<ConsultaPetOngDTO[]> {
        await this.ongService.consultarPorIdOng(idOng);
        const listaPetEntity = await this.model.find({
            where: { idOng: idOng },
            relations: { imagens: true, ong: { usuario: { imagem: true }, endereco: true } },
            order: { imagens: { idImagem: "ASC" } }
        });

        if (listaPetEntity.length == 0)
            throw new CustomHttpException(NENHUM_PET_CADASTRADO_PARA_ESTA_ONG);

        return listaPetEntity;
    }

    public async editar(idUsuario: number, idPet: number, petDto: PetDTO): Promise<boolean> {
        const ongDto = await this.ongService.consultarPorId(idUsuario);
        await this.consultarPorId(idUsuario, idPet);

        await this.validarTipoPet(petDto.tipo);
        await this.validarValorSexo(petDto.sexo);

        await this.model.update({ idOng: ongDto.idOng, idPet: idPet }, petDto);

        return true;
    }

    public async editarAdocao(idUsuario: number, idPet: number, adotado: boolean): Promise<boolean> {
        const ongDto = await this.ongService.consultarPorId(idUsuario);
        await this.consultarPorId(idUsuario, idPet);

        await this.model.update({ idOng: ongDto.idOng, idPet: idPet }, { adotado: adotado });

        return true;
    }

    public async deletarTodos(idUsuario: number): Promise<boolean> {
        const ongDto = await this.ongService.consultarPorId(idUsuario);

        let listaPetDto = null;
        try {
            listaPetDto = await this.consultarTodos(idUsuario);
        } catch (error) {
            return false;
        }

        await listaPetDto.forEach(async (pet: PetEntity) => {
            await this.imagemPetService.deletarTodas(pet.idPet);
        });

        await this.model.delete({ idOng: ongDto.idOng });

        return true;
    }

    public async deletar(idUsuario: number, idPet: number): Promise<boolean> {
        const ongDto = await this.ongService.consultarPorId(idUsuario);
        await this.consultarPorId(idUsuario, idPet);

        await this.processoAdocaoService.deletarTodosParaPet(idUsuario, idPet);
        await this.imagemPetService.deletarTodas(idPet);
        await this.model.delete({ idOng: ongDto.idOng, idPet: idPet });

        return true;
    }
}