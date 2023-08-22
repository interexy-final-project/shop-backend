import { Injectable } from "@nestjs/common";

import { EntityRepository } from "@mikro-orm/postgresql";
import {ShippingAddressEntity} from "app/users/entities/shipping-address.entity";

@Injectable()
export class ShippingAddressRepo extends EntityRepository<ShippingAddressEntity> {
  async getList() {
    return await this.findAll();
  }

  async getById(id: string) {
    return await this.findOne({ id });
  }
}
