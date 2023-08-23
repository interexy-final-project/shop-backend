import { EntityRepository } from '@mikro-orm/postgresql';
import { TypeEntity } from 'app/type/entities/type.entity';

export class TypeRepo extends EntityRepository<TypeEntity> {
  async getList() {
    return await this.findAll();
  }

  async getById(id: number) {
    return await this.findOne({ id });
  }
}
