import { EntityRepository } from '@mikro-orm/postgresql';
import { TShirtTypeEntity } from '../entities/t-shirt.entity';

export class TShirtTypeRepo extends EntityRepository<TShirtTypeEntity> {
  async getList() {
    return await this.findAll();
  }

  async getById(id: number) {
    return await this.findOne({ id });
  }
}
