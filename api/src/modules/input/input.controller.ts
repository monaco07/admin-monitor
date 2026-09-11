import { Body, Controller, Post, Req, UseInterceptors } from '@nestjs/common';
import { HostInfoDTO } from './dto/Input.dto';
import { InputService } from './input.service';
import { CookieValidationInterceptor } from '../auth/cookieValidator.interceptor';
import { ApiValidationInterceptor } from '../auth/apiValidator.interceptor';
import { ApiTokenRequest } from '../auth/dto/login.dto';

@Controller('input')
export class InputController {
    constructor(
        private inputService: InputService
    ){

    }

    @UseInterceptors(ApiValidationInterceptor)
    @Post("sendSnapshot")
    sendData(
        @Body() dto: HostInfoDTO,
        @Req() req: ApiTokenRequest,
        ){
        return this.inputService.sendSnapshot(dto, req.hostEntity)
    }
    
}
