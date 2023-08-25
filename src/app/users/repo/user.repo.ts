import { Injectable } from '@nestjs/common';

import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { UserEntity } from 'app/users/entities/user.entity';
import { UserSignUpForm } from 'app/auth/dto/user-sign-up.form';

@Injectable()
export class UserRepo extends EntityRepository<UserEntity> {
  constructor(private readonly manager: EntityManager) {
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

  async addOneUser(dto: UserSignUpForm) {
    const newUser = this.create({
      email: dto.email,
      password: dto.password,
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
}
