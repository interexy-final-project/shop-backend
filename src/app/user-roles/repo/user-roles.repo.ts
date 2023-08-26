import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/postgresql';

import { UserRoleEntity } from 'app/user-roles/entities/user-role.entity';
import { UserRoles } from '../enums/user-roles.enum';

@Injectable()
export class UserRolesRepo extends EntityRepository<UserRoleEntity> {
  async getAll() {
    return await this.findAll();
  }

  async getById(id: string) {
    return await this.findOne({ id });
  }

  public async getDefaultRole(type: UserRoles) {
    return this.findOne(
      { type, isDefault: true },
      { orderBy: { created: 'desc' } },
    );
  }
}
