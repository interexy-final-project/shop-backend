import {Entity, Enum, ManyToOne, OneToMany, PrimaryKey, Property} from '@mikro-orm/core';

import {UUIDEntity} from "shared/entities/uuid.entity";
import {EOrderStatuses} from "app/order/enums/order-statuses.enum";
import {UserEntity} from "app/users/entities/user.entity";
import {OrderRepo} from "app/order/repo/order.repo";
import {OrderItemEntity} from "app/order/entities/order-item.entity";

@Entity({ tableName: 'orders', customRepository: () => OrderRepo })
export class OrderEntity extends UUIDEntity {
  @Property({ name: 'user_id' })
  userId: string;

  @Property({ name: 'total' })
  total: number;

  @Enum({ name: 'status', array: false, items: () => EOrderStatuses })
  status!: EOrderStatuses;

  @ManyToOne({
    entity: () => UserEntity,
    inversedBy: e => e.orders,
    joinColumn: "user_id",
    referenceColumnName: "id",
    nullable: true,
    lazy: true,
  })
  user?: UserEntity;

  @OneToMany(() => OrderItemEntity, e => e.order)
  items?: OrderItemEntity[];
}
