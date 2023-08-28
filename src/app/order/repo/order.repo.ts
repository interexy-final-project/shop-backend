import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { OrderEntity } from 'app/order/entities/order.entity';
import { OrderStatuses } from '../enums/order-statuses.enum';
import { OrderDto } from '../dto/order.dto';

export class OrderRepo extends EntityRepository<OrderEntity> {
  constructor(manager: EntityManager) {
    super(manager, OrderEntity)
  }

  async getList(userId: string, status: OrderStatuses) {
    return await this.findAll({ populateWhere: { userId, status } });
  }

  async getById(id: string) {
    return await this.findOne({ id });
  }

  async updateOrder(id: string) {
    const updatingOrder = await this.getById(id);

    return this.assign(updatingOrder, { status: OrderStatuses.ARCHIVED });
  }

  async createOrder(dto: OrderDto) {

    const newOrder = this.create({
      userId:dto.userId,
      total:dto.total,
      status: OrderStatuses.ACTIVE,
      paymentMethod: dto.paymentMethod,
      address: dto.address
    })
    await this.persistAndFlush(newOrder)

    return this.getById(dto.userId)
  }
}
