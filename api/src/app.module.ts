import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InputModule } from './modules/input/input.module';
import { DashboardService } from './modules/dashboard/dashboard.service';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthService } from './modules/auth/auth.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'better-sqlite3',
        database: configService.getOrThrow<string>('DB_PATH'),
        synchronize: true,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],

      }),
    }),
    InputModule,
    DashboardModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, DashboardService],
})
export class AppModule { }
