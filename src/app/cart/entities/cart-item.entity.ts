import {Entity, Enum, ManyToOne, PrimaryKey, PrimaryKeyType, Property} from '@mikro-orm/core';

import {NoIdEntity} from "shared/entities/no-id.entity";
import {CartItemRepo} from "app/cart/repo/cart-item.repo";
import {UserEntity} from "app/users/entities/user.entity";
import {ProductEntity} from "app/product/entities/product.entity";
import {IDEntity} from "shared/entities/id.entity";

@Entity({ tableName: 'cart_items', customRepository: () => CartItemRepo })
export class CartItemEntity extends IDEntity {
  @Property({ name: 'order_id' })
  orderId: string;

  @Property({ name: 'product_id' })
  productId: number;

  @Property({ name: 'quantity' })
  quantity: number;

  @ManyToOne({
    entity: () => UserEntity,
    inversedBy: e => e.cartItems,
    joinColumn: "user_id",
    referenceColumnName: "id",
    nullable: true,
    lazy: true,
  })
  user?: UserEntity;

  @ManyToOne({
    entity: () => ProductEntity,
    inversedBy: e => e.cartItems,
    joinColumn: "product_id",
    referenceColumnName: "id",
    nullable: true,
    lazy: true,
  })
  product?: ProductEntity;
}
