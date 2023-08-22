import { Injectable } from "@nestjs/common";

import { EntityRepository } from "@mikro-orm/postgresql";
import { UserEntity } from "app/users/entities/user.entity";

@Injectable()
export class UserRepo extends EntityRepository<UserEntity> {
  async getList() {
    return await this.findAll();
  }

  async getById(id: string) {
    return await this.findOne({ id });
  }
}
