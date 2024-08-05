import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import compression from 'compression';
import express from 'express';
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.use(compression());
    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ limit: '50mb', extended: true }));
    app.enableCors({
        credentials: true,
        origin: true,
        allowedHeaders: ['Authorization', 'ResetToken', 'versao', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
        exposedHeaders: ['Authorization', 'ResetToken', 'versao'],
    });
    await app.listen(process.env.API_PORT);
}
bootstrap();
