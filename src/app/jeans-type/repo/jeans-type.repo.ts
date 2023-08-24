import { EntityRepository } from '@mikro-orm/postgresql';
import { JeansTypeEntity } from '../entities/jeans-type.entity';

export class JeansTypeRepo extends EntityRepository<JeansTypeEntity> {
  async getList() {
    return await this.findAll();
  }

  async getById(id: number) {
    return await this.findOne({ id });
  }
}
