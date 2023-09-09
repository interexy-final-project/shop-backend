import { Injectable } from '@nestjs/common';
import { UserRepo } from './repo/user.repo';
import { UserSignUpForm } from 'app/auth/dto/user-sign-up.form';
import { UserRoleDto } from 'app/user-roles/dto/user-role.dto';
import { UserRolesRepo } from 'app/user-roles/repo/user-roles.repo';
import { UserRoles } from 'app/user-roles/enums/user-roles.enum';
import { UserDeletedEvent } from 'app/events/user-deleted.event';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class UsersService {
  constructor(
    private readonly repo_users: UserRepo,
    private readonly repo_user_roles: UserRolesRepo,
    private readonly emitter: EventEmitter2,
  ) {}t

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

  async deleteUser(userId: string) {
    // return await this.repo_users.deleteUser(userId);
    const user = await this.repo_users.deleteUser(userId);
    return this.emitter.emit('user.deleted', new UserDeletedEvent(user));
  }
}
