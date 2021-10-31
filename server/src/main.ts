import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
dotenv.config();
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 3000;

  app.use(cookieParser());
  app.setGlobalPrefix('/api');
  app.enableCors({
    credentials: true,
  })

  await app.listen(PORT);
}
bootstrap();

// jenkins ㅠㅠ/.....
