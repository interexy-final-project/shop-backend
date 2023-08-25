import { EntityRepository } from '@mikro-orm/postgresql';
import { ProductEntity } from 'app/products/entities/product.entity';

export class ProductsRepo extends EntityRepository<ProductEntity> {
  async getAll() {
    return await this.findAll();
  }

  async getById(id: string) {
    return await this.findOne({ id });
  }
}
