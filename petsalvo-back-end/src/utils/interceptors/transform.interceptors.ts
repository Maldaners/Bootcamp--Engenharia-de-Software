//TODO: Revisar uso do prefixo (creio que será excluído)
// import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
// import { Observable, map } from "rxjs";

// export interface Response<T> {
//     dados: T;
// }

// export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>>{
//     intercept(context: ExecutionContext, next: CallHandler<T>): Observable<Response<T>> | Promise<Observable<Response<T>>> {
//         return next.handle().pipe(map((dados) => ({ dados })))
//     }
// }