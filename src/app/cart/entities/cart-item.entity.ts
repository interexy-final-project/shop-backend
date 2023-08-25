import { Entity, ManyToOne, OneToOne, Property } from '@mikro-orm/core';

import { CartItemRepo } from 'app/cart/repo/cart-item.repo';
import { UserEntity } from 'app/users/entities/user.entity';
import { ProductEntity } from 'app/products/entities/product.entity';
import { UUIDEntity } from 'shared/entities/uuid.entity';

@Entity({ tableName: 'cart_items', customRepository: () => CartItemRepo })
export class CartItemEntity extends UUIDEntity {
  @Property({ name: 'order_id' })
  orderId: string;

  @Property({ name: 'product_id' })
  productId: number;

  @Property({ name: 'quantity' })
  quantity: number;

  @ManyToOne({
    entity: () => UserEntity,
    inversedBy: (e) => e.cartItems,
    joinColumn: 'user_id',
    referenceColumnName: 'id',
    nullable: true,
    lazy: true,
  })
  user?: UserEntity;

  @OneToOne(() => ProductEntity, (product) => product.cartItem, {
    owner: true,
  })
  product?: ProductEntity;
}
