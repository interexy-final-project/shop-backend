import { Injectable } from '@nestjs/common';
import { CartItemRepo } from './repo/cart-item.repo';
import { CartItemDto } from './dto/cart-item.dto';

@Injectable()
export class CartService {
  constructor(private readonly cart_item_repo: CartItemRepo) {}

  async createNewCartItem(createCartDto: CartItemDto) {
    return await this.cart_item_repo.createNewCartItem(createCartDto);
  }

  async getCartItems(userId: string) {
    return await this.cart_item_repo.getCartItems(userId);
  }

  async getCartItem(cartId: string) {
    return await this.cart_item_repo.getCartItem(cartId);
  }

  async updateCartItem(dto: CartItemDto, cartId: string) {
    return await this.cart_item_repo.updateCartItem(dto, cartId);
  }

  async deleteCartItem(cartId: string) {
    return await this.cart_item_repo.deleteCartItem(cartId);
  }
}
