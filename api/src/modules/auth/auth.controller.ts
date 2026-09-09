import { Body, Controller, Get, Post, Req, Res, UseInterceptors } from '@nestjs/common';
import { LoginDTO, ModifiedRequest, UserDTO } from './dto/login.dto';
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

    ): Promise<UserDTO> {
        const { token, expiresAt } = await this.authService.login(loginDTO)

        res.cookie('session', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            expires: expiresAt,
            path: '/',
        });
        const dto = new UserDTO()
        dto.expiredAt = expiresAt.toISOString()
        dto.username = loginDTO.username
        return dto
    }

    @UseInterceptors(CookieValidationInterceptor)
    @Get('me')
    async me(
        @Req() req: ModifiedRequest
    ): Promise<UserDTO>{
        const dto = new UserDTO()
        dto.expiredAt = req.token.expiresAt.toISOString()
        dto.username = req.token.user.username
        return dto
    }

    @UseInterceptors(CookieValidationInterceptor)
    @Get('logout')
    async logout(
        @Req() req: ModifiedRequest,
        @Res({passthrough: true}) res: Response
    ){
        await this.authService.logout(req.token)
        res.clearCookie(
            "session",
            {
                path: "/"
            }
        )
    }
}
