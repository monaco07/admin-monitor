import { Module } from '@nestjs/common';
import { InputController } from './input.controller';
import { InputService } from './input.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HostSnapshot } from '../../entity/snapshots/hostSnapshot.entity';
import { DockerSnapshot } from '../../entity/snapshots/dockerSnapshot.entity';
import { Host } from '../../entity/host.entity';
import { ApiToken } from '../../entity/apiToken.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [InputController],
  providers: [InputService],
  imports: [TypeOrmModule.forFeature([HostSnapshot, Host]), AuthModule]
})
export class InputModule {}
