import { Injectable } from '@nestjs/common';
import { OrderRepo } from './repo/order.repo';
import { OrderItemRepo } from 'app/order-item/repo/order-item.repo';
import { OrderStatuses } from './enums/order-statuses.enum';
import { OrderDto } from './dto/order.dto';
import { CartItemRepo } from 'app/cart/repo/cart-item.repo';
import { CartItemDto } from 'app/cart/dto/cart-item.dto';
import { OrderPaginationQueryDto } from './dto/order-pagination-query.dto';
import { ProductsRepo } from 'app/products/repo/products.repo';

@Injectable()
export class OrderService {
  constructor(
    private readonly order_repo: OrderRepo,
    private readonly order_item_repo: OrderItemRepo,
    private readonly cart_repo: CartItemRepo,
    private readonly product_repo: ProductsRepo,
  ) {}
  async getOrders(queryParams?: OrderPaginationQueryDto) {
    return await this.order_repo.getAllOrders(queryParams);
  }

  async getOrderById(id: string) {
    return await this.order_repo.getById(id);
  }

  async getOrderByUserIdAndStatus(userId: string, status: OrderStatuses) {
    return await this.order_repo.getList(userId, status);
  }

  async createOrder(dto: OrderDto) {
    console.log(dto);
    const { id, userId } = await this.order_repo.createOrder(dto);
    const cartItems = CartItemDto.fromEntities(
      await this.cart_repo.getCartItems(userId),
    );
    cartItems.map(async (item) => {
      console.log(item, 'item');
      const productJSON = await this.product_repo.getById(item.productId);
      console.log(productJSON, 'json');
      await this.order_item_repo.createOrderItem(
        {
          ...item,
          product: productJSON,
        },
        id,
      );
    });
    cartItems.map(async (item) => {
      await this.cart_repo.deleteCartItem(item.id);
    });
  }

  async updateOrder(ids: string[]) {
    return await this.order_repo.updateOrders(ids);
  }
}
