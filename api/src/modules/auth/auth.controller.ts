import { Body, Controller, Get, Post, Req, Res, UseInterceptors } from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { CookieValidationInterceptor } from './cookieValidator.interceptor';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }
    @Post('login')
    async login(
        @Body() loginDTO: LoginDTO,
        @Res({ passthrough: true }) res: Response,

    ) {
        const { token, expiresAt } = await this.authService.login(loginDTO)

        res.cookie('session', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            expires: expiresAt,
            path: '/',
        });

        return { success: true, expiresAt: expiresAt };
    }

    @UseInterceptors(CookieValidationInterceptor)
    @Get('me')
    async me(
        @Req() req: any
    ){
        return {
            username: req.user.username
        }
    }
}
