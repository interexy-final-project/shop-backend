import { EntityRepository } from '@mikro-orm/postgresql';
import { ProductEntity } from 'app/product/entities/product.entity';

export class ProductRepo extends EntityRepository<ProductEntity> {
  async getList() {
    return await this.findAll();
  }

  async getById(id: number) {
    return await this.findOne({ id });
  }
}
