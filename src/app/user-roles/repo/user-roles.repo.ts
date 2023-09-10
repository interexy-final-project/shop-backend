import { Injectable } from '@nestjs/common';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';

import { UserRoleEntity } from 'app/user-roles/entities/user-role.entity';
import { UserRoles } from '../enums/user-roles.enum';
import { NewUserRoleForm } from '../dto/new-user-role.form';

@Injectable()
export class UserRolesRepo extends EntityRepository<UserRoleEntity> {
  constructor(manager: EntityManager) {
    super(manager, UserRoleEntity);
  }
  async getAll() {
    return await this.findAll();
  }

  async getById(id: string) {
    return await this.findOne({ id });
  }

  public async addOne(dto: NewUserRoleForm) {
    const role_e = this.create(dto);
    await this.persistAndFlush(role_e);
    return role_e;
  }

  public async getDefaultRole(type: UserRoles) {
    const result = await this.findOne(
      { type, isDefault: true },
      { orderBy: { created: 'desc' } },
    );
    return result;
  }
}
