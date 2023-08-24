import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { UUIDEntity } from 'shared/entities/uuid.entity';
import { UserEntity } from 'app/users/entities/user.entity';
import { ShippingAddressRepo } from 'app/shipping-address/repo/shipping-address.repo';

@Entity({
  tableName: 'shipping_addresses',
  customRepository: () => ShippingAddressRepo,
})
export class ShippingAddressEntity extends UUIDEntity {
  @Property({ name: 'address', type: 'text' })
  address: string;

  @Property({ name: 'city', type: 'text' })
  city: string;

  @Property({ name: 'phone' })
  phone!: string;

  @Property({ name: 'user_id' })
  user_id!: string;

  @ManyToOne({
    entity: () => UserEntity,
    inversedBy: (e) => e.addresses,
    joinColumn: 'user_id',
    referenceColumnName: 'id',
    nullable: true,
    lazy: true,
  })
  user?: UserEntity;
}
