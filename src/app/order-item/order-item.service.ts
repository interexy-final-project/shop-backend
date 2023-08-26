import { Injectable } from '@nestjs/common';
import { OrderItemRepo } from './repo/order-item.repo';

@Injectable()
export class OrderItemService {
  constructor(private readonly order_item_repo: OrderItemRepo) {}

  async getOrderItems(orderId: string) {
    return await this.order_item_repo.getOrderItemList(orderId);
  }

  async createOrderItem(cardId: string) {
    return await this.order_item_repo.createOrderItem(cardId);
  }
}
