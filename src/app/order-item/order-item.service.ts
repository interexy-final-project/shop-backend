import { Injectable } from '@nestjs/common';
import { OrderItemRepo } from './repo/order-item.repo';
import { OrderItemDto } from './dto/order-item.dto';

@Injectable()
export class OrderItemService {
  constructor(private readonly order_item_repo: OrderItemRepo) {}

  async getOrderItems(orderId: string) {
    return await this.order_item_repo.getOrderItemList(orderId);
  }

  async createOrderItem(dto: Partial<OrderItemDto>, cardId: string) {
    return await this.order_item_repo.createOrderItem(dto, cardId);
  }
}
