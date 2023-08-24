import { EntityRepository } from '@mikro-orm/postgresql';
import { ShirtTypeEntity } from '../entities/shirt-type.entity';

export class ShirtTypeRepo extends EntityRepository<ShirtTypeEntity> {
  async getList() {
    return await this.findAll();
  }

  async getById(id: number) {
    return await this.findOne({ id });
  }
}
