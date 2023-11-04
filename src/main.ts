import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { ErrorHandlerMiddleware } from './middleware/error-handler.middleware';

// Load environment variables from .env file
dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalFilters(new ErrorHandlerMiddleware());

  const config = new DocumentBuilder()
    .setTitle('Pokémon API')
    .setDescription('API for managing Pokémon data')
    .setVersion('1.0')
    .addTag('Pokémon')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('pokemon-api-docs', app, document);

  // Enable validation globally
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(3000);
}
bootstrap();
