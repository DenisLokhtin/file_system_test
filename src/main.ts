import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('file/:name');

  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT');

  await app.listen(PORT || 5000, () => {
    Logger.log(`Server started on PORT ${PORT}`, `http://localhost:${PORT}`);
  });
}
bootstrap();
