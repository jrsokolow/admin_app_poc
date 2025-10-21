import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getHello(): string {
        return 'NestJS Backend API is running! 🚀 Visit /products for CRUD operations';
    }
}

