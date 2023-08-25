import { Entity, Enum, OneToOne, Property } from '@mikro-orm/core';

import { BaseEntity } from 'shared/entities/base.entity';
import { ProductColors } from 'app/products/enums/product-colors.enum';
import { ProductSizes } from 'app/products/enums/product-sizes.enum';
import { ProductStatuses } from 'app/products/enums/product-statuses.enum';
import { ProductsRepo } from 'app/products/repo/products.repo';
import { CartItemEntity } from 'app/cart/entities/cart-item.entity';
import { ProductCategories } from '../enums/product-categories.enum';
import { ProductTypes } from '../enums/product-types.enum';

@Entity({
  tableName: 'products',
  discriminatorColumn: 'type',
  customRepository: () => ProductsRepo,
})
export class ProductEntity extends BaseEntity {
  @Property({ name: 'price' })
  price!: number;

  @Property({ name: 'images' })
  images!: string[];

  @Enum({ name: 'colors', array: true, items: () => ProductColors })
  colors!: ProductColors[];

  @Enum({ name: 'sizes', array: true, items: () => ProductSizes })
  sizes!: ProductSizes[];

  @Enum({
    name: 'status',
    array: false,
    items: () => ProductStatuses,
    default: ProductStatuses.ACTIVE,
  })
  status!: ProductStatuses;

  @Property({ name: 'description', type: 'text' })
  description!: string;

  @Property({ name: 'amount' })
  amount!: number;

  @Enum({
    name: 'type',
    array: false,
    items: () => ProductTypes,
  })
  type?: ProductTypes;

  @Enum({ name: 'category', array: false, items: () => ProductCategories })
  category!: ProductCategories;

  @OneToOne(() => CartItemEntity, (cartItem) => cartItem.product)
  cartItem?: CartItemEntity[];
}
