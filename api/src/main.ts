import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api/v1');
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  )
  app.use(cookieParser());

  // NUR DEV
  if (configService.get('NODE_ENV') === 'development') {

    app.enableCors({
      origin: 'http://localhost:4200',
      credentials: true,
    });

  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
