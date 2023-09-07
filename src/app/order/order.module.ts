import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { OrderEntity } from './entities/order.entity';
import { OrderRepo } from './repo/order.repo';
import { OrderItemRepo } from 'app/order-item/repo/order-item.repo';
import { CartItemRepo } from 'app/cart/repo/cart-item.repo';
import { ProductsRepo } from 'app/products/repo/products.repo';

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [OrderEntity],
    }),
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
    OrderRepo,
    OrderItemRepo,
    CartItemRepo,
    ProductsRepo,
  ],
  exports: [OrderService],
})
export class OrderModule {}
