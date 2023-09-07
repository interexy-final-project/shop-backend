import { Injectable } from '@nestjs/common';
import { ShippingAddressRepo } from './repo/shipping-address.repo';
import { NewShippingAddressForm } from './dto/new-shipping-address.form';

@Injectable()
export class ShippingAddressService {
  constructor(private readonly shipping_addresses_repo: ShippingAddressRepo) {}
  async getShippingAddress(userId: string) {
    return await this.shipping_addresses_repo.findOneByUserId(userId);
  }

  async addShippingAddress(dto: NewShippingAddressForm) {
    return await this.shipping_addresses_repo.addOne(dto);
  }
}
