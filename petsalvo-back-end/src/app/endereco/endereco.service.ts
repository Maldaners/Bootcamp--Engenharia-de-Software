import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EnderecoDTO } from "./dto/endereco.dto";
import { EnderecoEntity } from "./entities/endereco.entity";

export class EnderecoService {

    constructor(
        @InjectRepository(EnderecoEntity) private model: Repository<EnderecoEntity>,
    ) { }

    public async criar(idUsuario: number, enderecoDto: EnderecoDTO) {
        await this.model.save({ ...enderecoDto, idUsuario: idUsuario });
    }

    public async consultarPorId(idUsuario: number): Promise<EnderecoDTO> {
        const enderecoEntity = await this.model.findOne({
            where: { idUsuario: idUsuario }
        });

        return enderecoEntity;
    }

    public async consultarPorTodos(): Promise<EnderecoDTO[]> {
        return await this.model.find({ relations: { usuario: true } });
    }

    //TODO: Estudar uma melhora p/ performance de update (devolver um modelo com as alterações, ao invés de ler novamente)
    public async editar(idUsuario: number, enderecoDto: EnderecoDTO): Promise<EnderecoDTO> {
        await this.consultarPorId(idUsuario);
        await this.model.update({ idEndereco: idUsuario }, enderecoDto);

        return await this.consultarPorId(idUsuario);
    }

    public async deletar(idUsuario: number): Promise<boolean> {
        await this.consultarPorId(idUsuario);
        await this.model.delete({ idUsuario: idUsuario });

        return true;
    }
}