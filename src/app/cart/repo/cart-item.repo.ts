import { EntityRepository } from '@mikro-orm/postgresql';
import { CartItemEntity } from 'app/cart/entities/cart-item.entity';
import { CartItemDto } from '../dto/cart-item.dto';

export class CartItemRepo extends EntityRepository<CartItemEntity> {
  async getCartItem(cartId: string) {
    return await this.findOne({ id: cartId });
  }

  async getCartItems(userId: string) {
    return await this.findAll({ populateWhere: { userId } });
  }

  async createNewCartItem(dto: CartItemDto) {
    const newCartItem = this.create({
      userId: dto.userId,
      quantity: 1,
      productId: dto.productId,
    });

    return await this.em.persistAndFlush(newCartItem);
  }

  async updateCartItem(dto: CartItemDto, cartId: string) {
    const CartItem = await this.getCartItem(cartId);
    this.em.assign(CartItem, { quantity: dto.quantity }, { mergeObjects: true});

    return await this.em.flush()
  }

  async deleteCartItem(cartId: string) {
    const CartItem = await this.getCartItem(cartId);

    return await this.em.removeAndFlush(CartItem);
  }
}
