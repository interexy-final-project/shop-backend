import { Entity, Enum, OneToOne, Property } from '@mikro-orm/core';

import { BaseEntity } from 'shared/entities/base.entity';
import { EProductColors } from 'app/products/enums/product-colors.enum';
import { EProductSizes } from 'app/products/enums/product-sizes.enum';
import { EProductStatuses } from 'app/products/enums/product-statuses.enum';
import { ProductsRepo } from 'app/products/repo/products.repo';
import { CartItemEntity } from 'app/cart/entities/cart-item.entity';
import { EProductCategories } from '../enums/product-categories.enum';

@Entity({
  tableName: 'products',
  abstract: true,
  discriminatorColumn: 'type',
  discriminatorValue: 'product',
  customRepository: () => ProductsRepo,
})
export class ProductEntity extends BaseEntity {
  @Property({ name: 'price' })
  price!: number;

  @Property({ name: 'images' })
  images!: string[];

  @Enum({ name: 'colors', array: true, items: () => EProductColors })
  colors!: EProductColors[];

  @Enum({ name: 'sizes', array: true, items: () => EProductSizes })
  sizes!: EProductSizes[];

  @Enum({
    name: 'status',
    array: false,
    items: () => EProductStatuses,
    default: EProductStatuses.ACTIVE,
  })
  status!: EProductStatuses;

  @Property({ name: 'description', type: 'text' })
  description!: string;

  @Property({ name: 'amount' })
  amount!: number;

  @Enum({ name: 'category', array: false, items: () => EProductCategories })
  category!: string;

  @OneToOne(() => CartItemEntity, (cartItem) => cartItem.product)
  cartItem?: CartItemEntity[];
}
