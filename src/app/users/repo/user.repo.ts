import { ForbiddenException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
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

  async getById(id: string) {
    return await this.getEntityManager().findOne(UserEntity, { id });
  }

  async getByToken(resetToken: string) {
    return await this.getEntityManager().findOne(UserEntity, { resetToken })
  }

  async getByEmail(email: string) {
    return await this.getEntityManager().findOne(UserEntity, { email });
  }

  async getByEmailAndPassword(email: string, password: string) {
    return await this.getEntityManager().findOne(UserEntity, {
      email,
      password,
    });
  }

  async addOneUser(dto: UserSignUpForm, dto_role: UserRoleDto) {
    const password = await bcrypt.hash(dto.password, 10);
    const newUser = this.getEntityManager().create(UserEntity, {
      email: dto.email,
      password: password,
      role: dto_role.id,
      firstName: dto.firstName,
      lastName: dto.lastName,
      phone:dto.phone,
    });
    await this.getEntityManager().persistAndFlush(newUser);

    return newUser;
  }

  async updateRefreshTokenHash(id: string, hash: string) {
    const rtHash = await bcrypt.hash(hash, 10);

    const updatingUser = await this.getEntityManager().findOne(UserEntity, {
      id,
    });
    await this.getEntityManager().persistAndFlush(
      this.assign(updatingUser, { rtHash: rtHash }, { mergeObjects: true }),
    );

    return hash;
  }

  async logOut(id: string) {
    const user = await this.getEntityManager().findOne(UserEntity, { id });
    this.getEntityManager().assign(user, { rtHash: null });
    await this.getEntityManager().flush();

    return 'Done';
  }

  async changePassword(id: string, password: string) {
    const user = await this.getEntityManager().findOne(UserEntity, { id });
    const newPassword = await bcrypt.hash(password, 10);

    this.getEntityManager().assign(user, { password:newPassword });
    await this.getEntityManager().flush();

    return 'Ok!';
  }

  async deleteUser(userId: string) {
    const user = await this.getEntityManager().findOneOrFail(UserEntity, {
      id: userId,
    });

    if (user) {
      const status = UserStatuses.ARCHIVED;
      const rtHash = null;
      this.getEntityManager().assign(user, { status, rtHash });
      await this.getEntityManager().flush();
    }

    return user ?? null
  }

  async setResetToken(id: string, resetToken: string) {
    const user = await this.getEntityManager().findOne(UserEntity, { id });
    if(!user) throw new ForbiddenException();
    console.log(user)
    this.getEntityManager().assign(user, { resetToken });
    await this.getEntityManager().flush();

    return 'Reset token has been set!'
  }
}
