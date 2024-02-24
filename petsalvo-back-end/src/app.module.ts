import { Module } from "@nestjs/common";
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { SwaggerModule } from "@nestjs/swagger";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdotanteModule } from "./app/adotante/adotante.module";
import { AutenticacaoModule } from "./app/autenticacao/autenticacao.module";
import { AutenticacaoGuard } from "./app/autenticacao/guards/autenticacao.guard";
import { AutorizacaoModule } from "./app/autorizacao/autorizacao.module";
import { AutorizacaoGuard } from "./app/autorizacao/guards/autorizacao.guard";
import { EnderecoModule } from "./app/endereco/endereco.module";
import { FormularioModule } from "./app/formulario/formulario.module";
import { ImagemUsuarioModule } from "./app/imagem/imagem-usuario/imagem-usuario.module";
import { NotificacaoModule } from "./app/notificacao/notificacao.module";
import { OngModule } from "./app/ong/ong.module";
import { PetModule } from "./app/pet/pet.module";
import { PixModule } from "./app/pix/pix.module";
import { ProcessoAdocaoModule } from "./app/processo-adocao/processo-adocao.module";
import { StatusModule } from "./app/status/status.module";
import { UsuarioModule } from "./app/usuario/usuario.module";

@Module({
  imports: [
    UsuarioModule,
    EnderecoModule,
    OngModule,
    AdotanteModule,
    ProcessoAdocaoModule,
    NotificacaoModule,
    AutenticacaoModule,
    AutorizacaoModule,
    ImagemUsuarioModule,
    StatusModule,
    PixModule,
    FormularioModule,
    PetModule,

    //Módulos de configuração
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        database: process.env.BD_URL,
        type: "sqlite",
        synchronize: true,
        entities: ["dist/**/*.entity.js"]
      })
    }),
    SwaggerModule
  ],
  providers: [
    JwtService,
    {
      provide: APP_GUARD,
      useClass: AutenticacaoGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AutorizacaoGuard,
    },
  ]
})
export class AppModule { }