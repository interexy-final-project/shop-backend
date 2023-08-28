import { Module } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { OrderItemEntity } from './entities/order-item.entity';
import { OrderItemRepo } from './repo/order-item.repo';

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [OrderItemEntity]
    })
  ],
  providers: [OrderItemService, OrderItemRepo],
  exports: [OrderItemService]
})
export class OrderItemModule {}
