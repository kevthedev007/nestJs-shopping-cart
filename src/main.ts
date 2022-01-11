import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true
  }))

  const config = new DocumentBuilder()
    .setTitle('Shopping Cart System')
    .setDescription('Shopping Cart System Test')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/', app, document)

  await app.listen(3000);
}
bootstrap();
