import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
    private products: Product[] = [
        {
            id: 1,
            name: 'Laptop Pro 15',
            description: 'High-performance laptop with 16GB RAM and 512GB SSD',
            price: 1299.99,
            category: 'Electronics',
            stock: 25,
            imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
            createdAt: new Date('2024-01-15'),
            updatedAt: new Date('2024-01-15'),
        },
        {
            id: 2,
            name: 'Wireless Mouse',
            description: 'Ergonomic wireless mouse with precision tracking',
            price: 29.99,
            category: 'Accessories',
            stock: 150,
            imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
            createdAt: new Date('2024-01-16'),
            updatedAt: new Date('2024-01-16'),
        },
        {
            id: 3,
            name: 'USB-C Hub',
            description: '7-in-1 USB-C hub with HDMI, USB 3.0, and card readers',
            price: 49.99,
            category: 'Accessories',
            stock: 80,
            imageUrl: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400',
            createdAt: new Date('2024-01-17'),
            updatedAt: new Date('2024-01-17'),
        },
        {
            id: 4,
            name: 'Mechanical Keyboard',
            description: 'RGB mechanical keyboard with blue switches',
            price: 89.99,
            category: 'Peripherals',
            stock: 45,
            imageUrl: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=400',
            createdAt: new Date('2024-01-18'),
            updatedAt: new Date('2024-01-18'),
        },
        {
            id: 5,
            name: '27" 4K Monitor',
            description: '4K UHD monitor with HDR support and 144Hz refresh rate',
            price: 399.99,
            category: 'Electronics',
            stock: 30,
            imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400',
            createdAt: new Date('2024-01-19'),
            updatedAt: new Date('2024-01-19'),
        },
    ];
    private currentId = 6;

    create(createProductDto: CreateProductDto): Product {
        const newProduct: Product = {
            id: this.currentId++,
            ...createProductDto,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        this.products.push(newProduct);
        return newProduct;
    }

    findAll(): Product[] {
        return this.products;
    }

    findOne(id: number): Product {
        const product = this.products.find((p) => p.id === id);
        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
    }

    update(id: number, updateProductDto: UpdateProductDto): Product {
        const productIndex = this.products.findIndex((p) => p.id === id);
        if (productIndex === -1) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }

        const updatedProduct = {
            ...this.products[productIndex],
            ...updateProductDto,
            updatedAt: new Date(),
        };

        this.products[productIndex] = updatedProduct;
        return updatedProduct;
    }

    remove(id: number): void {
        const productIndex = this.products.findIndex((p) => p.id === id);
        if (productIndex === -1) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
        this.products.splice(productIndex, 1);
    }

    // Helper method for Refine.js pagination
    findAllPaginated(page = 1, pageSize = 10) {
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const data = this.products.slice(start, end);

        return {
            data,
            total: this.products.length,
            page,
            pageSize,
        };
    }
}

