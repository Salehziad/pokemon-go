import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Pokémon API')
    .setDescription('API for managing Pokémon data')
    .setVersion('1.0')
    .addTag('Pokémon')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('pokemon-api-docs', app, document);

  // Enable validation globally
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
