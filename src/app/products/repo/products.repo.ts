import { EntityRepository } from '@mikro-orm/postgresql';
import { ProductEntity } from 'app/products/entities/product.entity';
import { PaginationQueryDto } from 'shared/dtos/pagination-query.dto';
import { ProductCategories } from '../enums/product-categories.enum';

export class ProductsRepo extends EntityRepository<ProductEntity> {
  async getAll() {
    return await this.findAll();
  }

  async getById(id: string) {
    return await this.findOne({ id });
  }

  async getAllByCategory(
    category: string,
    paginationQuery: PaginationQueryDto,
  ) {
    return this.getEntityManager().findAndCount(
      ProductEntity,
      { category: ProductCategories[category] },
      { limit: paginationQuery.limit, offset: paginationQuery.offset },
    );
  }
}
