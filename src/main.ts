import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
  });
  app.use(helmet());
  app.setGlobalPrefix('api/v1');
  await app.listen(3000);
}
bootstrap();
