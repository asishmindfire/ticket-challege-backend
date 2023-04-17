import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
  });
  app.use(helmet());
  app.setGlobalPrefix('api/v1');
  console.log(port);

  await app.listen(port);
}
bootstrap();
