import { EntityRepository } from '@mikro-orm/postgresql';
import { KindEntity } from 'app/product/entities/kind.entity';

export class KindRepo extends EntityRepository<KindEntity> {
  async getList() {
    return await this.findAll();
  }

  async getById(id: number) {
    return await this.findOne({ id });
  }
}
