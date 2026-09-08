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

        // Deine Validierung
        const user = await this.authService.validateCookie(session);

        if (!user) {
            throw new UnauthorizedException('Invalid session cookie');
        }

        request.user = user
        return next.handle();
    }
}