import { Injectable } from '@nestjs/common';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { OrderItemEntity } from 'app/order-item/entities/order-item.entity';
import { OrderItemDto } from '../dto/order-item.dto';

@Injectable()
export class OrderItemRepo extends EntityRepository<OrderItemEntity> {
  constructor(manager: EntityManager) {
    super(manager, OrderItemEntity);
  }
  async getOrderItemList(orderId: string) {
    return await this.getEntityManager().find(OrderItemEntity, { orderId });
  }

  async createOrderItem(dto: Partial<OrderItemDto>, orderId: string) {
    const newOrderItem = this.getEntityManager().create(OrderItemEntity, {
      orderId: orderId,
      product: dto.product,
      quantity: dto.quantity,
    });
    return await this.getEntityManager().persistAndFlush(newOrderItem);
  }
}
