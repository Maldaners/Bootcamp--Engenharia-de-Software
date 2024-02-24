import { HttpException } from "@nestjs/common";
import { ApiResponseSchemaHost } from "@nestjs/swagger";

export class CustomHttpException extends HttpException {

    constructor(response: ApiResponseSchemaHost) {
        super(response.schema.example, Number(response.status));
    }
}