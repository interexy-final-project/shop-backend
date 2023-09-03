import { Injectable } from '@nestjs/common';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { CartItemEntity } from 'app/cart/entities/cart-item.entity';
import { CartItemDto } from '../dto/cart-item.dto';

@Injectable()
export class CartItemRepo extends EntityRepository<CartItemEntity> {
  constructor(manager: EntityManager) {
    super(manager, CartItemEntity);
  }

  async getCartItem(cartId: string) {
    return await this.getEntityManager().findOne(CartItemEntity, {
      id: cartId,
    });
  }

  async getCartItems(userId: string) {
    return await this.getEntityManager().find(
      CartItemEntity,
      { userId },
      { populate: ['product'] },
    );
  }

  async createNewCartItem(dto: CartItemDto) {
    const newCartItem = this.getEntityManager().create(CartItemEntity, {
      userId: dto.userId,
      quantity: 1,
      productId: dto.productId,
      size: dto.size,
      color: dto.color,
    });

    return await this.getEntityManager().persistAndFlush(newCartItem);
  }

  async updateCartItem(dto: CartItemDto, cartId: string) {
    const CartItem = await this.getCartItem(cartId);
    this.getEntityManager().assign(
      CartItem,
      { quantity: dto.quantity },
      { mergeObjects: true },
    );

    return await this.getEntityManager().flush();
  }

  async deleteCartItem(cartId: string) {
    const CartItem = await this.getCartItem(cartId);

    return await this.getEntityManager().removeAndFlush(CartItem);
  }
}
