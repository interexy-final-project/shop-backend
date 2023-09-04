import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { CartItemEntity } from './entities/cart-item.entity';
import { CartItemRepo } from './repo/cart-item.repo';

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [CartItemEntity],
    }),
  ],
  controllers: [CartController],
  providers: [CartService, CartItemRepo],
})
export class CartModule {}
