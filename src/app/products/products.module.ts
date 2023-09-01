import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductEntity } from './entities/product.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ProductsRepo } from './repo/products.repo';

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [ProductEntity],
    }),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepo],
  exports: [ProductsService],
})
export class ProductsModule {}
