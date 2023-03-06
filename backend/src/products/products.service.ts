import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create_product.dto'
import { UpdateProductDto } from './dto/update_product.dto'

@Injectable()
export class ProductsService {
    constructor(@InjectRepository(Product) private productRepository: Repository<Product>) { }

    //________________CREAR PRODUCTO_____________________________
    async createProduct(product: CreateProductDto) {
        // Verificamos que no haya dos nombres iguales.
        const productFounByName = await this.productRepository.findOne({
            where: {
                name: product.name,
            }
        })
        const productFounByArticle = await this.productRepository.findOne({
            where: {
                article: product.article,
            }
        })

        if (productFounByArticle) {
            return new HttpException('El producto que intenta crear ya existe con ese número de artículo!', HttpStatus.CONFLICT);
        }
        else if (productFounByName) {
            return new HttpException('El producto que intenta crear ya existe con ese nombre!', HttpStatus.CONFLICT);
        }

        const newProduct = this.productRepository.create(product)
        return this.productRepository.save(newProduct)
    }

    //_______________LISTAR PRODUCTOS____________________________
    async getProducts() {
        const listProduct = await this.productRepository.find();

        if (listProduct.length == 0) {
            return new HttpException('No hay productos registrados!', HttpStatus.NOT_FOUND);
        }

        return listProduct;
    }

    //_______________OBTENER PRODUCTO_________________________
    async getProduct(id: number) {
        const productFoundById = await this.productRepository.findOne({
            where: {
                //Equivale a decir id:id
                id
            }
        })

        if (!productFoundById) {
            return new HttpException('El producto que intenta buscar no existe!', HttpStatus.NOT_FOUND);
        }

        return productFoundById;
    }

    //________________ELIMINAR PRODUCTO__________________________
    async deleteProduct(id: number) {

        const productFoundById = await this.productRepository.findOne({
            where: {
                id: id
            }
        })

        if (!productFoundById) {
            return new HttpException('El producto que intenta eliminar no existe!', HttpStatus.NOT_FOUND);
        }

        return this.productRepository.delete({ id: id })
    }

    //__________________EDITAR PRODUCTO___________________________
    async updateProduct(id: number, product: UpdateProductDto) {

        const productFoundById = await this.productRepository.findOne({
            where: {
                id: id
            }
        });
        if (!productFoundById) {
            return new HttpException('El producto que intenta editar no existe!', HttpStatus.NOT_FOUND);
        }
        const updateProduct = Object.assign(productFoundById, product);
        /**
         *  var a = { x:10, y:20}
         *  var b = {y:40}
         *  Object.assing(a,b)
         * ----> a = {x:10, y:40}
         */
        return this.productRepository.save(updateProduct);
    }
}
