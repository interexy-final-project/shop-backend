import { EntityRepository } from "@mikro-orm/postgresql";
import {OrderEntity} from "app/order/entities/order.entity";

export class OrderRepo extends EntityRepository<OrderEntity> {
  async getList() {
    return await this.findAll();
  }

  async getById(id: string) {
    return await this.findOne({ id });
  }
}