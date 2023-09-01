import { Injectable } from '@nestjs/common';

import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { UserEntity } from 'app/users/entities/user.entity';
import { UserSignUpForm } from 'app/auth/dto/user-sign-up.form';
import { UserRoleDto } from 'app/user-roles/dto/user-role.dto';
import { UserStatuses } from '../enums/user-statuses.enum';

@Injectable()
export class UserRepo extends EntityRepository<UserEntity> {
  constructor(manager: EntityManager) {
    super(manager, UserEntity);
  }

  async getList() {
    return await this.findAll();
  }

  async getById(id: string) {
    return await this.findOne({ id });
  }

  async getByEmail(email: string) {
    return await this.findOne({ email });
  }

  async getByEmailAndPassword(email: string, password: string) {
    return await this.findOne({ email, password });
  }

  async addOneUser(dto: UserSignUpForm, dto_role: UserRoleDto) {
    const newUser = this.create({
      email: dto.email,
      password: dto.password,
      role: dto_role.id,
    });
    await this.persistAndFlush(newUser);

    return newUser;
  }

  async updateRefreshTokenHash(id: string, hash: string) {
    const updatingUser = await this.findOne({ id });
    await this.persistAndFlush(
      this.assign(updatingUser, { rtHash: hash }, { mergeObjects: true }),
    );

    return hash;
  }

  async deleteUser(userId: string): Promise<UserEntity | null> {
    const user = await this.findOneOrFail({ id: userId });

    if (user) {
      user.status = UserStatuses.ARCHIVED;
      user.rtHash = null;
      await this.persistAndFlush(user);
    }

    return user ?? null;
  }
}
