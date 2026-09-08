import { Body, Controller, Post, Req, UseInterceptors } from '@nestjs/common';
import { HostInfoDTO } from './dto/Input.dto';
import { InputService } from './input.service';
import { CookieValidationInterceptor } from '../auth/cookieValidator.interceptor';

@Controller('input')
export class InputController {
    constructor(
        private inputService: InputService
    ){

    }

    @UseInterceptors(CookieValidationInterceptor)
    @Post("sendSnapshot")
    sendData(
        @Body() dto: HostInfoDTO,
        @Req() req: any
        ){

            console.log(dto)
            console.log(req.user.username)
        return this.inputService.sendSnapshot(dto)
    }
    
}
