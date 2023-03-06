import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
//_______________PRODUCTS____________________________________
import { ProductsModule } from './products/products.module';
import { Product } from './products/entities/product.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Pass123',
      database: 'products_db',
      entities: [Product],
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
