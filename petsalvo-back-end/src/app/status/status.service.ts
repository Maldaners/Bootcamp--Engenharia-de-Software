import { Inject, forwardRef } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CustomHttpException } from "src/utils/exceptions/custom-http-exception.exception";
import { Repository } from "typeorm";
import { OngService } from "../ong/ong.service";
import { EditaStatusDTO } from "./dtos/edita-status.dto";
import { StatusDTO } from "./dtos/status.dto";
import { StatusEntity } from "./entities/status.entity";
import { NAO_PERMITIDO_CADASTRO_DE_MAIS_DE_5_STATUS, NENHUM_STATUS_CADASTRADO, STATUS_EXISTENTE_COM_NOME_INFORMADO, STATUS_NAO_ENCONTRADO_COM_ID } from "./responses/status.responses";
import { OngDTO } from "../ong/dto/ong.dto";

export class StatusService {

    private readonly limiteStatus: number = 5;

    constructor(
        @InjectRepository(StatusEntity) private model: Repository<StatusEntity>,
        @Inject(forwardRef(() => OngService)) private readonly ongService: OngService
    ) { }


    public async criar(idUsuario: number, listaStatusDto: StatusDTO[]): Promise<boolean> {
        const ongDto = await this.ongService.consultarPorId(idUsuario);
        const listaStatusDtoAtual = await this.retornarListaStatus(ongDto.idOng);

        listaStatusDto = await this.retornarListaDiferencaStatus(listaStatusDto, listaStatusDtoAtual);

        if (listaStatusDtoAtual.length + listaStatusDto.length > this.limiteStatus)
            throw new CustomHttpException(NAO_PERMITIDO_CADASTRO_DE_MAIS_DE_5_STATUS);

        await this.criarListaStatus(ongDto, listaStatusDto);

        return true;
    }

    public async criarStatusOpcional(ongDto: OngDTO, listaStatusDto: StatusDTO[]) {
        if (listaStatusDto != null) {
            await this.criarListaStatus(ongDto, listaStatusDto);
            return true;
        }

        return false;
    }

    private async criarListaStatus(ongDto: OngDTO, listaStatusDto: StatusDTO[]) {
        listaStatusDto.forEach(async (status) => {
            await this.model.save({ ...status, idOng: ongDto.idOng });
        });
    }

    public async validarStatusOpcional(listaStatusDto: StatusDTO[]) {
        if (listaStatusDto != null && listaStatusDto.length > this.limiteStatus)
            throw new CustomHttpException(NAO_PERMITIDO_CADASTRO_DE_MAIS_DE_5_STATUS);
    }

    private async retornarListaStatus(idOng: number): Promise<StatusDTO[]> {
        return await this.model.find({
            where: { idOng: idOng }
        });
    }

    private async retornarListaDiferencaStatus(statusDtoNovo: StatusDTO[], statusDtoRegistrados: StatusDTO[]) {
        return statusDtoNovo.filter((status) => {
            let inexistente = true;

            statusDtoRegistrados.forEach((statusRegistrado) => {
                if (statusRegistrado.nome.toLocaleLowerCase() === status.nome.toLocaleLowerCase()) {
                    inexistente = false;
                    return;
                }
            });

            return inexistente;
        });
    }

    public async consultarPorId(idUsuario: number, idStatus: number): Promise<StatusDTO> {
        const ongDto = await this.ongService.consultarPorId(idUsuario);

        const statusEntity = await this.model.findOne({
            where: { idOng: ongDto.idOng, idStatus: idStatus }
        });

        if (!statusEntity)
            throw new CustomHttpException(STATUS_NAO_ENCONTRADO_COM_ID);


        return statusEntity;
    }

    public async consultarTodos(idUsuario: number): Promise<StatusDTO[]> {
        const ongDto = await this.ongService.consultarPorId(idUsuario);

        const listaStatusDto = await this.retornarListaStatus(ongDto.idOng);

        if (!listaStatusDto.length)
            throw new CustomHttpException(NENHUM_STATUS_CADASTRADO);

        return listaStatusDto;
    }

    private async editarStatus(idUsuario: number, idOng: number, idStatus: number, statusDto: StatusDTO) {
        await this.consultarPorId(idUsuario, idStatus);

        (await this.consultarTodos(idUsuario)).forEach((status) => {
            if (status.nome.toLowerCase() === statusDto.nome.toLowerCase())
                throw new CustomHttpException(STATUS_EXISTENTE_COM_NOME_INFORMADO);
        });

        await this.model.update({ idOng: idOng, idStatus: idStatus }, statusDto);
    }

    public async editar(idUsuario: number, idStatus: number, statusDto: StatusDTO): Promise<boolean> {
        const ongDto = await this.ongService.consultarPorId(idUsuario);
        await this.editarStatus(idUsuario, ongDto.idOng, idStatus, statusDto);

        return true;
    }

    public async editarLista(idUsuario: number, listaStatusDto: EditaStatusDTO[]): Promise<boolean> {
        const ongDto = await this.ongService.consultarPorId(idUsuario);

        for (const statusDto of listaStatusDto) {
            await this.editarStatus(idUsuario, ongDto.idOng, statusDto.idStatus, statusDto);
        }

        return true;
    }

    public async deletarTodos(idUsuario: number): Promise<boolean> {
        const ongDto = await this.ongService.consultarPorId(idUsuario);

        await this.model.delete({ idOng: ongDto.idOng });

        return true;
    }

    public async deletar(idUsuario: number, idStatus: number): Promise<boolean> {
        const ongDto = await this.ongService.consultarPorId(idUsuario);
        await this.consultarPorId(idUsuario, idStatus);

        await this.model.delete({ idOng: ongDto.idOng, idStatus: idStatus });

        return true;
    }
}