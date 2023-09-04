import { Injectable } from '@nestjs/common';
import { CartItemRepo } from './repo/cart-item.repo';
import { CartItemDto } from './dto/cart-item.dto';

@Injectable()
export class CartService {
  constructor(private readonly cart_item_repo: CartItemRepo) {}

  async createNewCartItem(createCartDto: CartItemDto) {
    const existingCartItem = await this.cart_item_repo.checkIfCartItemExists(
      createCartDto,
    );

    if (existingCartItem) {
      return this.cart_item_repo.updateCartItem(
        { quantity: existingCartItem.quantity + 1 },
        existingCartItem.id,
      );
    }
    return await this.cart_item_repo.createNewCartItem(createCartDto);
  }

  async getCartItems(userId: string) {
    return await this.cart_item_repo.getCartItems(userId);
  }

  async getCartItem(cartId: string) {
    return await this.cart_item_repo.getCartItem(cartId);
  }

  async updateCartItem(dto: Partial<CartItemDto>, cartId: string) {
    return await this.cart_item_repo.updateCartItem(dto, cartId);
  }

  async deleteCartItem(cartId: string) {
    return await this.cart_item_repo.deleteCartItem(cartId);
  }
}
