import { Entity, Enum, ManyToOne, Property } from '@mikro-orm/core';

import { OrderStatuses } from 'app/order/enums/order-statuses.enum';
import { OrderItemRepo } from 'app/order-item/repo/order-item.repo';
import { OrderEntity } from 'app/order/entities/order.entity';
import { UUIDEntity } from 'shared/entities/uuid.entity';

@Entity({ tableName: 'order_items', customRepository: () => OrderItemRepo })
export class OrderItemEntity extends UUIDEntity {
  @Property({ name: 'order_id' })
  orderId: string;

  @Property({ name: 'product', type: 'JSON' })
  product: object;

  @Property({ name: 'quantity' })
  quantity: number;

  @Enum({ name: 'status', array: false, items: () => OrderStatuses })
  status!: OrderStatuses;

  @ManyToOne({
    entity: () => OrderEntity,
    inversedBy: (e) => e.orderItems,
    joinColumn: 'order_id',
    referenceColumnName: 'id',
    nullable: true,
    lazy: true,
  })
  order?: OrderEntity;
}
