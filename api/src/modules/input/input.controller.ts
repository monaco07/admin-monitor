import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
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
        @Body() dto: HostInfoDTO){

            console.log(dto)
            
        return this.inputService.sendSnapshot(dto)
    }
    
}
