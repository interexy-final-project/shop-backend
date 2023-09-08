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
import { UserStatuses } from 'app/users/enums/user-statuses.enum';
import { UserRoleEntity } from 'app/user-roles/entities/user-role.entity';
import { ShippingAddressEntity } from 'app/shipping-address/entities/shipping-address.entity';
import { OrderEntity } from 'app/order/entities/order.entity';
import { CartItemEntity } from 'app/cart/entities/cart-item.entity';

@Unique({ name: 'ix_user_email', properties: ['email'] })
@Entity({ tableName: 'users', customRepository: () => UserRepo })
export class UserEntity extends UUIDEntity {
  @Property({ name: 'first_name' })
  firstName!: string;

  @Property({ name: 'last_name' })
  lastName!: string;

  @Property({ name: 'email', unique: true })
  email!: string;

  @Property({ name: 'phone', unique: true })
  phone!: string;

  @Property({ name: 'password' })
  password!: string;

  @Property({ name: 'rtHash', nullable: true, type: 'text' })
  rtHash?: string;

  @Property({ name: 'resetToken', nullable: true, type: 'text' })
  resetToken?: string;

  @Enum({
    name: 'status',
    array: false,
    items: () => UserStatuses,
    default: UserStatuses.ACTIVE,
  })
  status!: UserStatuses;

  @Property({ name: 'role_id', nullable: true })
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
