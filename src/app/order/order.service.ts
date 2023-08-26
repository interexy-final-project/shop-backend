import { Injectable } from '@nestjs/common';
import { OrderRepo } from './repo/order.repo';
import { OrderItemRepo } from 'app/order-item/repo/order-item.repo';
import { OrderStatuses } from './enums/order-statuses.enum';
import { OrderDto } from './dto/order.dto';
import { CartItemRepo } from 'app/cart/repo/cart-item.repo';
import { CartItemDto } from 'app/cart/dto/cart-item.dto';

@Injectable()
export class OrderService {
  constructor(
    private readonly order_repo: OrderRepo,
    private readonly order_item_repo: OrderItemRepo,
    private readonly cart_repo: CartItemRepo,
  ) {}

  async getOrderById(id: string) {
    return await this.order_repo.getById(id);
  }

  async getOrderByUserIdAndStatus(userId: string, status: OrderStatuses) {
    return await this.order_repo.getList(userId, status);
  }

  async createOrder(dto: OrderDto, userId: string) {
    const newOrder = await this.order_repo.createOrder(dto);
    const { id } = newOrder;
    const cartItems = CartItemDto.fromEntities(
      await this.cart_repo.getCartItems(userId),
    );
    cartItems.map(async (item) => {
      // const productJSON = awaith this.product_repo.productJSON({item.productId})
      await this.order_item_repo.createOrderItem({...item, product: {
        "name": "somename",
        "price": "223",
        "images" : ["http://img1", "http://img2"],
        "colors" : ["RED","BLUE"],
        "sizes" : ["S", "M"],
        "status" : "Active",
        "description" : "some description",
        "amount" : "5",
        "category" : "Children",
        "hip_girth" : "23"
        }}, id);
    });
    cartItems.map(async (item) => {
      await this.cart_repo.deleteCartItem(item.id);
    });
  }

  async updateOrder(id: string){
    return await this.order_repo.updateOrder(id)
  }
}
