import { Inject, forwardRef } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CustomHttpException } from "src/utils/exceptions/custom-http-exception.exception";
import { Repository } from "typeorm";
import { EnderecoService } from "../endereco/endereco.service";
import { FormularioService } from "../formulario/formulario.service";
import { ProcessoAdocaoService } from "../processo-adocao/processo-adocao.service";
import { TipoUsuario } from "../usuario/enum/tipoUsuario.enum";
import { UsuarioService } from "../usuario/usuario.service";
import { AdotanteDTO } from "./dto/adotante.dto";
import { ConsultaAdotanteDTO } from "./dto/consulta-adotante.dto";
import { AdotanteEntity } from "./entitites/adotante.entity";
import { ADOTANTE_NAO_ENCONTRADO_COM_ID_DO_USUARIO, NENHUM_ADOTANTE_CADASTRADO } from "./responses/adotante.responses";
import { CriarAdotanteDTO } from "./dto/criar-adotante.dto";

export class AdotanteService {

    constructor(
        @InjectRepository(AdotanteEntity) private model: Repository<AdotanteEntity>,
        private readonly usuarioService: UsuarioService,
        private readonly enderecoService: EnderecoService,
        @Inject(forwardRef(() => FormularioService)) private readonly formularioService: FormularioService,
        @Inject(forwardRef(() => ProcessoAdocaoService)) private readonly processoAdocaoService: ProcessoAdocaoService
    ) { }

    public async criar(adotanteDto: CriarAdotanteDTO): Promise<boolean> {
        await this.formularioService.validarRespostasFormularioAdotanteOpcional(adotanteDto.formulario);
        
        adotanteDto.usuario = await this.usuarioService.normalizar(adotanteDto.usuario, TipoUsuario.ADOTANTE);

        const adotanteEntity = await this.model.save(adotanteDto);
        await this.enderecoService.criar(adotanteEntity.idUsuario, adotanteDto.endereco);
        await this.formularioService.criarFormularioAdotanteOpcional(adotanteEntity, adotanteDto.formulario);

        return true;
    }

    public async consultarPorId(idUsuario: number): Promise<ConsultaAdotanteDTO> {
        const adotanteEntity = await this.model.findOne({
            where: { idUsuario: idUsuario },
            relations: { usuario: { imagem: true }, endereco: true },
        });

        if (!adotanteEntity)
            throw new CustomHttpException(ADOTANTE_NAO_ENCONTRADO_COM_ID_DO_USUARIO);

        //TODO: Validar padrão de criação de DTOs para retornar dados especificos p/ melhor performance
        //TODO: Validar em qual camada faremos o tratamento dos dados para o DTO, pois pode haver quebra
        //delete adotante.usuario.senha, delete adotante.idUsuario, delete adotante.idAdotante, delete adotante.usuario.tipoUsuario, delete adotante.idEndereco, delete adotante.endereco.idEndereco;

        return adotanteEntity;
    }

    public async consultarPorIdAdotante(idAdotante: number): Promise<ConsultaAdotanteDTO> {
        const adotanteEntity = await this.model.findOne({
            where: { idAdotante: idAdotante },
            relations: { usuario: { imagem: true }, endereco: true },
        });

        if (!adotanteEntity)
            throw new CustomHttpException(ADOTANTE_NAO_ENCONTRADO_COM_ID_DO_USUARIO);

        //TODO: Validar padrão de criação de DTOs para retornar dados especificos p/ melhor performance
        //TODO: Validar em qual camada faremos o tratamento dos dados para o DTO, pois pode haver quebra
        //delete adotante.usuario.senha, delete adotante.idUsuario, delete adotante.idAdotante, delete adotante.usuario.tipoUsuario, delete adotante.idEndereco, delete adotante.endereco.idEndereco;

        return adotanteEntity;
    }

    public async consultarTodos(): Promise<ConsultaAdotanteDTO[]> {
        const listaAdotantesEntity = await this.model.find({ relations: { usuario: { imagem: true }, endereco: true } });

        if (!listaAdotantesEntity.length)
            throw new CustomHttpException(NENHUM_ADOTANTE_CADASTRADO);

        //TODO: Validar padrão de criação de DTOs para retornar dados especificos p/ melhor performance
        //TODO: Validar em qual camada faremos o tratamento dos dados para o DTO, pois pode haver quebra
        //listaAdotantes.forEach(function (adotante) { delete adotante.usuario.senha, delete adotante.idUsuario, delete adotante.idAdotante, delete adotante.usuario.tipoUsuario, delete adotante.idEndereco, delete adotante.endereco.idEndereco; });

        return listaAdotantesEntity;
    }

    //TODO: Estudar uma melhora p/ performance de update (devolver um modelo com as alterações, ao invés de ler novamente)
    public async editar(idUsuario: number, adotanteDto: AdotanteDTO): Promise<boolean> {
        adotanteDto.usuario = await this.usuarioService.editar(idUsuario, adotanteDto.usuario);
        adotanteDto.endereco = await this.enderecoService.editar(idUsuario, adotanteDto.endereco);

        //TODO: Revisar como aplicar melhor este item, pois o mesmo não poderia estar na entity
        delete adotanteDto.endereco;
        await this.model.update({ idUsuario: idUsuario }, adotanteDto);

        return true;
    }

    public async deletar(idUsuario: number): Promise<boolean> {
        await this.consultarPorId(idUsuario);

        await this.processoAdocaoService.deletarTodosParaAdotante(idUsuario);
        await this.formularioService.deletarFormularioRespondidoAdotanteSeExistente(idUsuario);
        await this.model.delete({ idUsuario: idUsuario });
        await this.enderecoService.deletar(idUsuario);
        await this.usuarioService.deletar(idUsuario, TipoUsuario.ADOTANTE);

        return true;
    }
}