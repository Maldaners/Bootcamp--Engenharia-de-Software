import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EnderecoService } from "./endereco.service";
import { EnderecoEntity } from "./entities/endereco.entity";

@Module({
    imports: [TypeOrmModule.forFeature([EnderecoEntity])],
    providers: [EnderecoService],
    exports: [EnderecoService]
})
export class EnderecoModule { }