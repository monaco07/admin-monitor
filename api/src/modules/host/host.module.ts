import { Module } from '@nestjs/common';
import { HostController } from './host.controller';
import { HostService } from './host.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Host } from '../../entity/host.entity';
import { AuthModule } from '../auth/auth.module';
import { CookieValidationInterceptor } from '../auth/cookieValidator.interceptor';

@Module({
  controllers: [HostController],
  providers: [HostService, CookieValidationInterceptor],
  imports: [TypeOrmModule.forFeature([Host]), AuthModule]
})
export class HostModule {}
