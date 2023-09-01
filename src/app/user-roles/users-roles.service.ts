import { Injectable } from '@nestjs/common';
import { UserRolesRepo } from './repo/user-roles.repo';
import { NewUserRoleForm } from './dto/new-user-role.form';

@Injectable()
export class UserRolesService {
  public constructor(private readonly repo_user_roles: UserRolesRepo) {}

  public async addRole(dto: NewUserRoleForm) {
    return this.repo_user_roles.addOne(dto);
  }

  public async getAllRoles() {
    return this.repo_user_roles.getAll();
  }
}
