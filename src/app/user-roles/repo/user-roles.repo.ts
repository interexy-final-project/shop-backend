import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/postgresql';

import { UserRoleEntity } from 'app/user-roles/entities/user-role.entity';

@Injectable()
export class UserRolesRepo extends EntityRepository<UserRoleEntity> {
  async getAll() {
    return await this.findAll();
  }

  async getById(id: number) {
    return await this.findOne({ id });
  }
}
