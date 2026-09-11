import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entity/auth/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SessionToken } from '../../entity/auth/session.entity';
import { Host } from '../../entity/host.entity';

@Module({
  providers: [AuthService, ConfigService],
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([User, SessionToken, Host]),
    ConfigModule],
  exports: [AuthService]


})
export class AuthModule { }
