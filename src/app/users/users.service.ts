import { Injectable } from '@nestjs/common';
import { UserRepo } from './repo/user.repo';
import { UserSignUpForm } from 'app/auth/dto/user-sign-up.form';
import { UserRoleDto } from 'app/user-roles/dto/user-role.dto';
import { UserRolesRepo } from 'app/user-roles/repo/user-roles.repo';
import { UserRoles } from 'app/user-roles/enums/user-roles.enum';

@Injectable()
export class UsersService {
  constructor(
    private readonly repo_users: UserRepo,
    private readonly repo_user_roles: UserRolesRepo,
  ) {}

  async getUsers() {
    return await this.repo_users.getList();
  }

  async getUserByEmail(email: string) {
    return await this.repo_users.getByEmail(email);
  }

  async getUserInfo(userId: string) {
    return await this.repo_users.getById(userId);
  }

  async addNewUser(dto: UserSignUpForm) {
    const e_role = await this.repo_user_roles.getDefaultRole(UserRoles.CLIENT);
    const dto_role = await UserRoleDto.fromEntity(e_role);
    return await this.repo_users.addOneUser(dto, dto_role);
  }

  async updateUser() {}

  async deleteUser() {}
}
