import { BadRequestException, Injectable } from '@nestjs/common';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { CartItemEntity } from 'app/cart/entities/cart-item.entity';
import { CartItemDto } from '../dto/cart-item.dto';
import { ErrorCodes } from 'shared/enums/error-codes.enum';

@Injectable()
export class CartItemRepo extends EntityRepository<CartItemEntity> {
  constructor(manager: EntityManager) {
    super(manager, CartItemEntity);
  }

  async getCartItem(cartId: string) {
    return await this.getEntityManager().findOne(
      CartItemEntity,
      {
        id: cartId,
      },
      { populate: ['product'] },
    );
  }

  async getCartItems(userId: string) {
    return await this.getEntityManager().find(
      CartItemEntity,
      { userId },
      { populate: ['product'] },
    );
  }

  async checkIfCartItemExists(dto: CartItemDto) {
    const existingCartItem = await this.getEntityManager().findOne(
      CartItemEntity,
      {
        userId: dto.userId,
        productId: dto.productId,
        size: dto.size,
        color: dto.color,
      },
    );

    return existingCartItem;
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

  async updateCartItem(dto: Partial<CartItemDto>, cartId: string) {
    const cartItem = await this.getCartItem(cartId);
    const result = this.getEntityManager().assign(
      cartItem,
      { quantity: dto.quantity },
      { mergeObjects: true },
    );
    await this.getEntityManager().flush();

    return result;
  }

  async deleteCartItem(cartId: string) {
    const cartItem = await this.getCartItem(cartId);

    await this.getEntityManager().removeAndFlush(cartItem);

    return cartItem;
  }
}
