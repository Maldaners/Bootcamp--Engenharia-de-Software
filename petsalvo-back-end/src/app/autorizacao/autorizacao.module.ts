import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { AutorizacaoGuard } from "./guards/autorizacao.guard";

@Module({
    providers: [
        JwtService,
        {
            provide: APP_GUARD,
            useClass: AutorizacaoGuard,
        },
    ]
})
export class AutorizacaoModule { }