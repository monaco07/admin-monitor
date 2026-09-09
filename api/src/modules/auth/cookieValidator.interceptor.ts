import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class CookieValidationInterceptor implements NestInterceptor {
    constructor(
        private authService: AuthService
    ) { }

    async intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Promise<Observable<any>> {


        const request = context.switchToHttp().getRequest();
        const session = request.cookies?.session;
        if (!session) {
            throw new UnauthorizedException('Missing session cookie');
        }

        const sessionToken = await this.authService.validateCookie(session);

        if (!sessionToken) {
            throw new UnauthorizedException('Invalid session cookie');
        }
        request.token = sessionToken
        return next.handle();
    }
}