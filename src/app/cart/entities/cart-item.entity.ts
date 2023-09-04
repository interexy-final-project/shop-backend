import { Entity, Enum, ManyToOne, OneToOne, Property } from '@mikro-orm/core';

import { CartItemRepo } from 'app/cart/repo/cart-item.repo';
import { UserEntity } from 'app/users/entities/user.entity';
import { ProductEntity } from 'app/products/entities/product.entity';
import { UUIDEntity } from 'shared/entities/uuid.entity';
import { ProductSizes } from 'app/products/enums/product-sizes.enum';
import { ProductColors } from 'app/products/enums/product-colors.enum';

@Entity({ tableName: 'cart_items', customRepository: () => CartItemRepo })
export class CartItemEntity extends UUIDEntity {
  @Property({ name: 'user_id' })
  userId: string;

  @Property({ name: 'product_id' })
  productId: string;

  @Property({ name: 'quantity', default: 1 })
  quantity: number;

  @Enum({
    name: 'size',
    array: false,
    items: () => ProductSizes,
  })
  size!: ProductSizes;

  @Enum({
    name: 'color',
    array: false,
    items: () => ProductColors,
  })
  color!: ProductColors;

  @ManyToOne({
    entity: () => UserEntity,
    inversedBy: (e) => e.cartItems,
    joinColumn: 'user_id',
    referenceColumnName: 'id',
    nullable: true,
    lazy: true,
  })
  user?: UserEntity;

  // @OneToOne(() => ProductEntity, (product) => product.cartItem, {
  //   owner: true,
  //   nullable: true,
  // })
  // product?: ProductEntity;

  @ManyToOne({
    entity: () => ProductEntity,
    inversedBy: (p) => p.cartItems,
    joinColumn: 'product_id',
    referenceColumnName: 'id',
    nullable: true,
    lazy: true,
  })
  product?: ProductEntity;
}
