import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from "@nestjs/swagger";

export class SwaggerUtils {

    public async setup(app: INestApplication) {
        const config = new DocumentBuilder()
            .setTitle('PetSalvo')
            .setDescription('Documentação completa da API para a aplicação híbrida "PetSalvo".')
            .setVersion('1.0')
            .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
            .addSecurityRequirements('bearer')
            .build();

        const document = SwaggerModule.createDocument(app, config, await this.getOptions());
        SwaggerModule.setup('swagger', app, document);
    }

    private async getOptions(): Promise<SwaggerDocumentOptions> {
        return {
            operationIdFactory: (
                controllerKey: string,
                methodKey: string
            ) => methodKey
        };
    }
}