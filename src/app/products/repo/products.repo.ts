import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { ProductEntity } from 'app/products/entities/product.entity';
import { PaginationQueryDto } from 'shared/dtos/pagination-query.dto';
import { ProductCategories } from '../enums/product-categories.enum';
import { ProductSizes } from '../enums/product-sizes.enum';
import { ProductColors } from '../enums/product-colors.enum';
import { ProductTypes } from '../enums/product-types.enum';
import { ProductsPaginationQueryDto } from '../dto/products-pagination-query.dto';
import { ProductStatuses } from '../enums/product-statuses.enum';

@Injectable()
export class ProductsRepo extends EntityRepository<ProductEntity> {
  async getAll(
    category: ProductCategories,
    sizes: ProductSizes[],
    colors: ProductColors[],
    type: ProductTypes,
    paginationQuery: PaginationQueryDto,
  ) {
    const filterOptions: { [key: string]: any } = {};

    if (category) {
      filterOptions.category = category;
    }

    if (sizes) {
      filterOptions.sizes = { $overlap: sizes };
    }

    if (colors) {
      filterOptions.colors = { $overlap: colors };
    }

    if (type) {
      filterOptions.type = type;
    }
    const result = await this.getEntityManager().find(
      ProductEntity,
      filterOptions,
      {
        limit: paginationQuery.limit,
        offset: paginationQuery.offset,
      },
    );
    console.log(result);
    return result;
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
    return this.getEntityManager().find(
=======
    const { count, page } = paginationQuery;

    return this.getEntityManager().findAndCount(
      ProductEntity,
      { category: ProductCategories[category] },
      { limit: count ?? 10, offset: page * count ?? 0 },
    );
  }

  async getAllBySizes(
    requestedSizes: ProductSizes[],
    paginationQuery: PaginationQueryDto,
  ) {
    return this.getEntityManager().find(
      ProductEntity,
      {
        sizes: { $overlap: requestedSizes },
      },
      { limit: paginationQuery.limit, offset: paginationQuery.offset },
    );
  }

  async getAllByColors(
    requestedColors: ProductColors[],
    paginationQuery: PaginationQueryDto,
  ) {
    return this.getEntityManager().find(
      ProductEntity,
      {
        colors: { $overlap: requestedColors },
      },
      { limit: paginationQuery.limit, offset: paginationQuery.offset },
    );
  }

  async getAllByType(type: ProductTypes, paginationQuery: PaginationQueryDto) {
    return this.getEntityManager().find(
      ProductEntity,
      {
        type: type,
      },
      { limit: paginationQuery.limit, offset: paginationQuery.offset },
    );
  }
}
