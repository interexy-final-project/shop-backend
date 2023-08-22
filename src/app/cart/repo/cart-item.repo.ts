import { EntityRepository } from "@mikro-orm/postgresql";
import {CartItemEntity} from "app/cart/entities/cart-item.entity";

export class CartItemRepo extends EntityRepository<CartItemEntity> {
  async getList() {
    return await this.findAll();
  }
}