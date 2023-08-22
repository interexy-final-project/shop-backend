import { EntityRepository } from '@mikro-orm/postgresql';
import { CategoryEntity } from 'app/product/entities/category.entity';

export class CategoryRepo extends EntityRepository<CategoryEntity> {
  async getList() {
    return await this.findAll();
  }

  async getById(id: number) {
    return await this.findOne({ id });
  }
}
