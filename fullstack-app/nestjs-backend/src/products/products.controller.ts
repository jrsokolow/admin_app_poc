import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    ParseIntPipe,
    Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Post()
    create(@Body() createProductDto: CreateProductDto) {
        return this.productsService.create(createProductDto);
    }

    @Get()
    findAll(
        @Query('_start') start?: string,
        @Query('_end') end?: string,
        @Query('_sort') sort?: string,
        @Query('_order') order?: string,
        @Res() res?: Response,
    ) {
        const products = this.productsService.findAll();
        const total = products.length;

        // Support for Refine pagination
        let result = products;
        if (start && end) {
            const startIndex = parseInt(start);
            const endIndex = parseInt(end);
            result = products.slice(startIndex, endIndex);
        }

        // Set X-Total-Count header for Refine
        res.setHeader('X-Total-Count', total.toString());
        res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');

        // Return array directly (not wrapped in object)
        return res.json(result);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.productsService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateProductDto: UpdateProductDto,
    ) {
        return this.productsService.update(id, updateProductDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        this.productsService.remove(id);
        return { message: `Product ${id} deleted successfully` };
    }
}

