import { Injectable } from '@nestjs/common';
import { OrderRepo } from './repo/order.repo';
import { OrderItemRepo } from 'app/order-item/repo/order-item.repo';
import { OrderStatuses } from './enums/order-statuses.enum';
import { OrderDto } from './dto/order.dto';
import { CartItemRepo } from 'app/cart/repo/cart-item.repo';

@Injectable()
export class OrderService {
  constructor(
    private readonly order_repo: OrderRepo,
    private readonly order_item_repo: OrderItemRepo,
    private readonly cart_repo: CartItemRepo
  ) {}

  async getOrderById(id: string) {
    return await this.order_repo.getById(id);
  }

  async getOrderByUserIdAndStatus(userId: string, status: OrderStatuses) {
    return await this.order_repo.getList(userId, status);
  }

  async createOrder(dto: OrderDto, cartIds: string[]) {
    const newOrder = await this.order_repo.createOrder(dto);
    const { id } = newOrder
    //get CartItem
    await this.order_item_repo.createOrderItem(oidto, id)
    //delete CartItem
  }
}
