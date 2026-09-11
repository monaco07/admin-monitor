import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class ApiValidationInterceptor implements NestInterceptor {
    constructor(
        private authService: AuthService
    ) { }

    async intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Promise<Observable<any>> {


        const request = context.switchToHttp().getRequest();
        const authorization = request.headers.authorization;        
        const [type, token] = authorization.split(' ');

        if (type !== 'Bearer' || !token) {
            throw new UnauthorizedException('Invalid authorization header');
        }

        const host = await this.authService.validateApiToken(token);

        if (!token) {
            throw new UnauthorizedException('Invalid Bearer token!');
        }
        request.hostEntity = host
        return next.handle();
    }
}