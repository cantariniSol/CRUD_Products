import { Controller, Post, Get, Delete, Patch, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CreateProductDto } from './dto/create_product.dto';
import { UpdateProductDto } from './dto/update_product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) { }

    //_______________CREAR PRODUCTO______________________
    @Post()
    createProduct(@Body() newProduct: CreateProductDto) {
        return this.productsService.createProduct(newProduct);
    }

    //_______________LISTAR PRODUCTOS______________________
    @Get()
    getProducts() {
        return this.productsService.getProducts();
    }

    //_______________OBTENER UN PRODUCTO______________________
    @Get(':id')
    getProduct(@Param('id', ParseIntPipe) id: number) {
        // console.log(id);
        // console.log(typeof (id));
        return this.productsService.getProduct(id);
    }

    //_______________ELIMINAR PRODUCTO______________________
    @Delete(':id')
    deleteProduct(@Param('id', ParseIntPipe) id: number) {
        return this.productsService.deleteProduct(id);
    }

    //_______________EDITAR PRODUCTO______________________
    @Patch(':id')
    updateProduct(@Param('id', ParseIntPipe) id: number, @Body() product: UpdateProductDto) {
        return this.productsService.updateProduct(id, product);
    }
} 
