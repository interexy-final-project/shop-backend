import { Injectable } from '@nestjs/common';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { OrderEntity } from 'app/order/entities/order.entity';
import { OrderStatuses } from '../enums/order-statuses.enum';
import { OrderDto } from '../dto/order.dto';

@Injectable()
export class OrderRepo extends EntityRepository<OrderEntity> {
  constructor(manager: EntityManager) {
    super(manager, OrderEntity);
  }

  async getList(userId: string, status: OrderStatuses) {
    return await this.getEntityManager().find(OrderEntity, { userId, status });
  }

  async getById(id: string) {
    return await this.getEntityManager().findOne(OrderEntity, { id });
  }

  async updateOrder(id: string) {
    const updatingOrder = await this.getById(id);
    this.getEntityManager().assign(updatingOrder, {
      status: OrderStatuses.ARCHIVED,
    });

    return this.getEntityManager().flush();
  }

  async createOrder(dto: OrderDto) {
    const newOrder = this.getEntityManager().create(OrderEntity, {
      userId: dto.userId,
      total: dto.total,
      status: OrderStatuses.ACTIVE,
      paymentMethod: dto.paymentMethod,
      address: dto.address,
    });
    await this.getEntityManager().persistAndFlush(newOrder);

    return newOrder;
  }
}
