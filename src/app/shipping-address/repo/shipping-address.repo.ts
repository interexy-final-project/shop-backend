import { HttpStatus, Injectable } from '@nestjs/common';

import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { ShippingAddressEntity } from 'app/shipping-address/entities/shipping-address.entity';
import { NewShippingAddressForm } from '../dto/new-shipping-address.form';

@Injectable()
export class ShippingAddressRepo extends EntityRepository<ShippingAddressEntity> {
  constructor(private readonly manager: EntityManager) {
    super(manager, ShippingAddressEntity);
  }
  async findOneByUserId(userId: string) {
    const result = await this.getEntityManager().findOne(
      ShippingAddressEntity,
      {
        userId,
      },
    );
    return result;
  }

  async addOne(dto: NewShippingAddressForm) {
    const NewShippingAddressForm = this.getEntityManager().create(
      ShippingAddressEntity,
      {
        address: dto.address,
        city: dto.city,
        phone: dto.phone,
        userId: dto.userId,
        postalCode: dto.postalCode,
      },
    );
    await this.getEntityManager().persistAndFlush(NewShippingAddressForm);
    if (NewShippingAddressForm)
      return {
        statusCode: HttpStatus.OK,
        message: 'shipping-address product has been created',
      };

    return {
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'shipping-address product has not been created',
    };
  }
}
