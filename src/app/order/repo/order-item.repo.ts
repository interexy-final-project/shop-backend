import { EntityRepository } from '@mikro-orm/postgresql';
import { OrderItemEntity } from 'app/order/entities/order-item.entity';

export class OrderItemRepo extends EntityRepository<OrderItemEntity> {
  async getList() {
    return await this.findAll();
  }
}
