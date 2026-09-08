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
        console.log(request)
        const session = request.cookies?.session;
        console.log(session)
        if (!session) {
            throw new UnauthorizedException('Missing session cookie');
        }

        // Deine Validierung
        const isValid = await this.authService.validateCookie(session);

        if (!isValid) {
            throw new UnauthorizedException('Invalid session cookie');
        }

        
        return next.handle();
    }
}