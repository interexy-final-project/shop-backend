import { EntityRepository } from '@mikro-orm/postgresql';
import { ProductEntity } from 'app/products/entities/product.entity';
import { PaginationQueryDto } from 'shared/dtos/pagination-query.dto';
import { ProductCategories } from '../enums/product-categories.enum';
import { ProductSizes } from '../enums/product-sizes.enum';
import { ProductColors } from '../enums/product-colors.enum';
import { ProductTypes } from '../enums/product-types.enum';

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
  }

  async getById(id: string) {
    return await this.findOne({ id });
  }

  async getAllByCategory(
    category: string,
    paginationQuery: PaginationQueryDto,
  ) {
    return this.getEntityManager().find(
      ProductEntity,
      { category: ProductCategories[category] },
      { limit: paginationQuery.limit, offset: paginationQuery.offset },
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
