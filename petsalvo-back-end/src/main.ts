import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import { SwaggerUtils } from './utils/swagger.utils';
import { DIRETORIO_IMAGENS_NOME_PASTA } from './app/utils/diretorio.utils';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('/api/v1');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.useStaticAssets(join(__dirname, '..', DIRETORIO_IMAGENS_NOME_PASTA), {
    index: false,
    prefix: '/' + DIRETORIO_IMAGENS_NOME_PASTA,
  });

  await new SwaggerUtils().setup(app);

  await app.listen(8080);
}

bootstrap();