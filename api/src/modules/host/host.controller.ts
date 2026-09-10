import { Body, Controller, Get, Post, Req, UseInterceptors } from '@nestjs/common';
import { CookieValidationInterceptor } from '../auth/cookieValidator.interceptor';
import { HostService } from './host.service';
import { CreateHostDTO, UpdateAPITokenDTO } from './dto/host.dto';
import { ModifiedRequest } from '../auth/dto/login.dto';

@UseInterceptors(CookieValidationInterceptor)
@Controller('host')
export class HostController {
    constructor(
        private hostService: HostService
    ){}
    @Post()
    async createHost(
        @Body() dto: CreateHostDTO
    ){
        return await this.hostService.createHost(dto.hostname, dto.description)
    }
    
    @Get()
    async getHosts(){
        return await this.hostService.getHosts()
    }

    @Post('updateToken')
    async updateToken(
        @Body() dto: UpdateAPITokenDTO
    ){
        return await this.hostService.updateAPIToken(dto.id)
    }
}
