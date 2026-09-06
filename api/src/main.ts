import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const isDevelopment = process.env.NODE_ENV === 'development';


  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);

  if (isDevelopment) {
    app.enableCors({
      origin: 'http://localhost:4200',
      credentials: true,
    });

  }
}
await bootstrap();
