import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  app.setGlobalPrefix('api');

  if (configService.get('NODE_ENV') === 'development') {

    app.enableCors({
      origin: 'http://localhost:4200',
      credentials: true,
    });

  }

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
