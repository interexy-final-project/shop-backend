import {Entity, Enum, ManyToOne, OneToMany, Property} from '@mikro-orm/core';

import {BaseEntity} from "app/product/entities/base.entity";
import {EProductColors} from "app/product/enums/product-colors.enum";
import {EProductSizes} from "app/product/enums/product-sizes.enum";
import {EProductStatuses} from "app/product/enums/product-statuses.enum";
import {ProductRepo} from "app/product/repo/product.repo";
import {KindEntity} from "app/product/entities/kind.entity";
import {OrderItemEntity} from "app/order/entities/order-item.entity";
import {CartItemEntity} from "app/cart/entities/cart-item.entity";

@Entity({ tableName: 'products', customRepository: () => ProductRepo })
export class ProductEntity extends BaseEntity {
  @Property({ name: 'price' })
  price: number;

  @Property({ name: 'images' })
  images: string[];

  @Enum({ name: 'colors', array: true, items: () => EProductColors })
  colors!: EProductColors[];

  @Enum({ name: 'sizes', array: true, items: () => EProductSizes })
  sizes!: EProductSizes[];

  @Enum({ name: 'status', array: false, items: () => EProductStatuses, default: EProductStatuses.ACTIVE })
  status!: EProductStatuses;

  @Property({ name: 'description', type: 'text' })
  description: string;

  @Property({ name: 'kind_id' })
  kindId!: number;

  @ManyToOne({
    entity: () => KindEntity,
    inversedBy: e => e.products,
    joinColumn: "kind_id",
    referenceColumnName: "id",
    nullable: true,
    lazy: true,
  })
  kind?: KindEntity;

  @OneToMany(() => CartItemEntity, e => e.product)
  cartItems?: CartItemEntity[];
}
