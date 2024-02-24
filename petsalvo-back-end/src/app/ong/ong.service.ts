import { Inject, forwardRef } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OngDTO } from "src/app/ong/dto/ong.dto";
import { OngEntity } from "src/app/ong/entities/ong.entity";
import { CustomHttpException } from "src/utils/exceptions/custom-http-exception.exception";
import { Repository } from "typeorm";
import { EnderecoService } from "../endereco/endereco.service";
import { PetService } from "../pet/pet.service";
import { PixService } from "../pix/pix.service";
import { ProcessoAdocaoService } from "../processo-adocao/processo-adocao.service";
import { StatusService } from "../status/status.service";
import { TipoUsuario } from "../usuario/enum/tipoUsuario.enum";
import { UsuarioService } from "../usuario/usuario.service";
import { ConsultaOngDTO } from "./dto/consulta-ong.dto";
import { CriarOngDTO } from "./dto/criar-ong.dto";
import { NENHUMA_ONG_CADASTRADA, ONG_NAO_ENCONTRADA_COM_ID_DO_USUARIO, ONG_NAO_ENCONTRADA_COM_ID_INFORMADO } from "./responses/ong.responses";

export class OngService {

    constructor(
        @InjectRepository(OngEntity) private model: Repository<OngEntity>,
        private readonly usuarioService: UsuarioService,
        private readonly enderecoService: EnderecoService,
        @Inject(forwardRef(() => StatusService)) private readonly statusService: StatusService,
        @Inject(forwardRef(() => PixService)) private readonly pixService: PixService,
        @Inject(forwardRef(() => PetService)) private readonly petService: PetService,
        @Inject(forwardRef(() => ProcessoAdocaoService)) private readonly processoAdocaoService: ProcessoAdocaoService
    ) { }

    public async criar(ongDto: CriarOngDTO): Promise<boolean> {
        await this.statusService.validarStatusOpcional(ongDto.status);
        await this.pixService.validarPixOpcional(ongDto.pix);

        ongDto.usuario = await this.usuarioService.normalizar(ongDto.usuario, TipoUsuario.ONG);

        const ongEntity = await this.model.save(ongDto);
        await this.enderecoService.criar(ongEntity.idUsuario, ongDto.endereco);
        await this.statusService.criarStatusOpcional(ongEntity, ongDto.status);
        await this.pixService.criarPixOpcional(ongEntity, ongDto.pix);

        return true;
    }

    public async consultarPorId(idUsuario: number): Promise<ConsultaOngDTO> {
        const ongEntity = await this.model.findOne({
            where: { idUsuario: idUsuario },
            relations: { usuario: { imagem: true }, endereco: true, status: true, pix: true },
        });

        if (!ongEntity)
            throw new CustomHttpException(ONG_NAO_ENCONTRADA_COM_ID_DO_USUARIO);

        //TODO: Validar padrão de criação de DTOs para retornar dados especificos p/ melhor performance
        //TODO: Validar em qual camada faremos o tratamento dos dados para o DTO, pois pode haver quebra
        //delete ongEntity.usuario.senha, delete ongEntity.idUsuario, delete ongEntity.idOng, delete ongEntity.usuario.tipoUsuario, delete ongEntity.endereco.idEndereco;

        return ongEntity;
    }

    public async consultarPorIdOng(idOng: number): Promise<ConsultaOngDTO> {
        const ongEntity = await this.model.findOne({
            where: { idOng: idOng },
            relations: { usuario: { imagem: true }, endereco: true, status: true, pix: true },
        });

        if (!ongEntity)
            throw new CustomHttpException(ONG_NAO_ENCONTRADA_COM_ID_INFORMADO);

        //TODO: Validar padrão de criação de DTOs para retornar dados especificos p/ melhor performance
        //TODO: Validar em qual camada faremos o tratamento dos dados para o DTO, pois pode haver quebra
        //delete ongEntity.usuario.senha, delete ongEntity.idUsuario, delete ongEntity.idOng, delete ongEntity.usuario.tipoUsuario, delete ongEntity.endereco.idEndereco;

        return ongEntity;
    }

    public async consultarTodas(): Promise<ConsultaOngDTO[]> {
        const listaOngsEntity = await this.model.find({ relations: { usuario: { imagem: true }, endereco: true, status: true, pix: true } });

        if (!listaOngsEntity.length)
            throw new CustomHttpException(NENHUMA_ONG_CADASTRADA);

        //TODO: Validar padrão de criação de DTOs para retornar dados especificos p/ melhor performance
        //TODO: Validar em qual camada faremos o tratamento dos dados para o DTO, pois pode haver quebra
        //listaOngsEntity.forEach(function (ongEntity) { delete ongEntity.usuario.senha, delete ongEntity.idUsuario, delete ongEntity.idOng, delete ongEntity.usuario.tipoUsuario, delete ongEntity.endereco.idEndereco });

        return listaOngsEntity;
    }

    public async editar(idUsuario: number, ongDto: OngDTO): Promise<boolean> {
        ongDto.usuario = await this.usuarioService.editar(idUsuario, ongDto.usuario);
        ongDto.endereco = await this.enderecoService.editar(idUsuario, ongDto.endereco);

        //TODO: Revisar como aplicar melhor este item, pois o mesmo não poderia estar no DTO
        delete ongDto.endereco;
        await this.model.update({ idUsuario: idUsuario }, ongDto);

        return true;
    }

    public async deletar(idUsuario: number): Promise<boolean> {
        await this.consultarPorId(idUsuario);

        await this.processoAdocaoService.deletarTodosParaOng(idUsuario);
        await this.petService.deletarTodos(idUsuario);
        await this.pixService.deletarTodos(idUsuario);
        await this.statusService.deletarTodos(idUsuario);
        await this.model.delete({ idUsuario: idUsuario });
        await this.enderecoService.deletar(idUsuario);
        await this.usuarioService.deletar(idUsuario, TipoUsuario.ONG);

        return true;
    }
}