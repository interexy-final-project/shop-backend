import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { ProductEntity } from 'app/products/entities/product.entity';
import { PaginationQueryDto } from 'shared/dtos/pagination-query.dto';
import { ProductCategories } from '../enums/product-categories.enum';
import { ProductsPaginationQueryDto } from '../dto/products-pagination-query.dto';
import { ProductStatuses } from '../enums/product-statuses.enum';
import { ProductColors } from '../enums/product-colors.enum';
import { ProductSizes } from '../enums/product-sizes.enum';
import { ProductTypes } from '../enums/product-types.enum';
import { ProductPriceFilter } from '../enums/product-price-filter.enum';

@Injectable()
export class ProductsRepo extends EntityRepository<ProductEntity> {
  constructor(manager: EntityManager) {
    super(manager, ProductEntity);
  }

  async getAll(
    category: ProductCategories,
    sizes: ProductSizes[],
    colors: ProductColors[],
    type: ProductTypes,
    price: ProductPriceFilter,
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

    const result = await this.getEntityManager().findAndCount(
      ProductEntity,
      filterOptions,
      {
        limit: paginationQuery.count ?? 10,
        offset: (paginationQuery.page - 1) * paginationQuery.count ?? 0,
        orderBy: price ? { price } : { created: 'asc' },
        // (currentPage - 1) * itemsPerPage
      },
    );

    return result;
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

  // ПОЛУЧАЕМ ТИПЫ КАТЕГОРИИ (ДЖИНСЫ, МАЙКИ, РУБАШКИ)

  async getAllTypes(type: ProductTypes) {
    const filterOptions: { [key: string]: any } = {};

    if (type) {
      filterOptions.type = type;
    }
    const result = await this.getEntityManager().find(
      ProductEntity,
      filterOptions,
    );
    return result;
  }

  async getById(id: string) {
    try {
      return await this.getEntityManager().findOne(ProductEntity, { id });
    } catch (error) {
      console.error('User not found:', error);
    }
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

  async getAllProductsByCategory(
    category: string,
    paginationQuery: PaginationQueryDto,
  ) {
    const { count, page } = paginationQuery;

    return this.getEntityManager().findAndCount(
      ProductEntity,
      { category: ProductCategories[category] },
      { limit: count ?? 10, offset: page * count ?? 0 },
    );
  }

  async productJSON(productId: string) {
    const product = await this.getById(productId);
    return JSON.stringify(product);
  }
}
