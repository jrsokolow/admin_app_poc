import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Enable CORS for frontend communication
    app.enableCors({
        origin: ['http://localhost:3000', 'http://frontend:3000'],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });

    const port = process.env.PORT || 4000;
    await app.listen(port);

    console.log(`🚀 NestJS Backend is running on: http://localhost:${port}`);
    console.log(`📦 Products API: http://localhost:${port}/products`);
}

bootstrap();

