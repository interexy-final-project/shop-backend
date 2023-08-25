import {
  Entity,
  Enum,
  ManyToOne,
  OneToMany,
  Property,
  Unique,
} from '@mikro-orm/core';
import { UserRepo } from 'app/users/repo/user.repo';
import { UUIDEntity } from 'shared/entities/uuid.entity';
import { EUserStatuses } from 'app/users/enums/user-statuses.enum';
import { UserRoleEntity } from 'app/user-roles/entities/user-role.entity';
import { ShippingAddressEntity } from 'app/shipping-address/entities/shipping-address.entity';
import { OrderEntity } from 'app/order/entities/order.entity';
import { CartItemEntity } from 'app/cart/entities/cart-item.entity';

@Unique({ name: 'ix_user_email', properties: ['email'] })
@Entity({ tableName: 'users', customRepository: () => UserRepo })
export class UserEntity extends UUIDEntity {
  @Property({ name: 'first_name' })
  firstName: string;

  @Property({ name: 'second_name' })
  secondName: string;

  @Property({ name: 'email', unique: true })
  email!: string;

  @Property({ name: 'password' })
  password!: string;

  @Enum({
    name: 'status',
    array: false,
    items: () => EUserStatuses,
    default: EUserStatuses.ACTIVE,
  })
  status!: EUserStatuses;

  @Property({ name: 'role_id' })
  roleId!: number;

  @ManyToOne({
    entity: () => UserRoleEntity,
    inversedBy: (e) => e.users,
    joinColumn: 'role_id',
    referenceColumnName: 'id',
    nullable: true,
    lazy: true,
  })
  role?: UserRoleEntity;

  @OneToMany(() => ShippingAddressEntity, (e) => e.user)
  addresses?: ShippingAddressEntity[];

  @OneToMany(() => OrderEntity, (e) => e.user)
  orders?: OrderEntity[];

  @OneToMany(() => CartItemEntity, (e) => e.user)
  cartItems?: CartItemEntity[];
}
