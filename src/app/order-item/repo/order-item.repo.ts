import { EntityRepository } from '@mikro-orm/postgresql';
import { OrderItemEntity } from 'app/order-item/entities/order-item.entity';
import { OrderItemDto } from '../dto/order-item.dto';

export class OrderItemRepo extends EntityRepository<OrderItemEntity> {
  async getOrderItemList(orderId: string) {
    return await this.findAll( { populateWhere: { orderId }});
  }

  async createOrderItem(dto: OrderItemDto, orderId: string) {
    //fromEntity
    const newOrderItem =  this.create({
        //result
    })
    await this.persistAndFlush(newOrderItem);

    return newOrderItem
  }
}
