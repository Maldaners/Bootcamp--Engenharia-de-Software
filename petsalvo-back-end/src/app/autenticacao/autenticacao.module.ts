import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core/constants';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutenticacaoController } from 'src/app/autenticacao/autenticacao.controller';
import { AutenticacaoService } from 'src/app/autenticacao/autenticacao.service';
import { EncryptUtils } from 'src/utils/encrypt.utils';
import { UsuarioEntity } from '../usuario/entities/usuario.entity';
import { UsuarioModule } from '../usuario/usuario.module';
import { AutenticacaoGuard } from './guards/autenticacao.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioEntity]),
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: process.env.JWT_EXPIRE_IN,
        }
      })
    }),
    UsuarioModule
  ],
  controllers: [AutenticacaoController],
  providers: [
    AutenticacaoService,
    EncryptUtils,
    {
      provide: APP_GUARD,
      useClass: AutenticacaoGuard,
    },
  ]
})
export class AutenticacaoModule { }