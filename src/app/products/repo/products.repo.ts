import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { ProductEntity } from 'app/products/entities/product.entity';
import { PaginationQueryDto } from 'shared/dtos/pagination-query.dto';
import { ProductCategories } from '../enums/product-categories.enum';
import { ProductsPaginationQueryDto } from '../dto/products-pagination-query.dto';
import { ProductStatuses } from '../enums/product-statuses.enum';

@Injectable()
export class ProductsRepo extends EntityRepository<ProductEntity> {
  constructor(manager: EntityManager) {
    super(manager, ProductEntity);
  }

  async getAllProducts(queryParams?: ProductsPaginationQueryDto) {
    const { count, page, orderBy, direction } = queryParams || {};
    return await this.getEntityManager().find(
      ProductEntity,
      {},
      {
        limit: count ?? 10,
        offset: page * count ?? 0,
        orderBy: orderBy ? { [orderBy]: direction } : { created: 'ASC' },
      },
    );
  }

  async getById(id: string) {
    return await this.getEntityManager().findOne(ProductEntity, { id });
  }

  async updateProducts(ids: string[]) {
    Array.from(ids).forEach(async (id) => {
      const updatingProduct = await this.getById(id);
      this.getEntityManager().assign(updatingProduct, {
        status: ProductStatuses.ARCHIVED,
      });
      this.getEntityManager().flush();
    });

    return 'Done';
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
