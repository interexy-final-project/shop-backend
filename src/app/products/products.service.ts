import { Injectable } from '@nestjs/common';
import { ProductsRepo } from './repo/products.repo';
import { PaginationQueryDto } from 'shared/dtos/pagination-query.dto';
import { ProductSizes } from './enums/product-sizes.enum';
import { ProductColors } from './enums/product-colors.enum';
import { ProductTypes } from './enums/product-types.enum';
import { ProductCategories } from './enums/product-categories.enum';

@Injectable()
export class ProductsService {
  constructor(private readonly repo_products: ProductsRepo) {}

  public async getAllProductsByFilters(
    category: ProductCategories,
    sizes: ProductSizes[],
    colors: ProductColors[],
    type: ProductTypes,
    paginationQuery: PaginationQueryDto,
  ) {
    return this.repo_products.getAll(
      category,
      sizes,
      colors,
      type,
      paginationQuery,
    );
  }

  public async getAllProductsByCategory(
    category: string,
    paginationQuery: PaginationQueryDto,
  ) {
    return this.repo_products.getAllByCategory(category, paginationQuery);
  }

  public async getAllProductsBySizes(
    sizes: ProductSizes[],
    paginationQuery: PaginationQueryDto,
  ) {
    return this.repo_products.getAllBySizes(sizes, paginationQuery);
  }

  public async getAllProductsByColors(
    colors: ProductColors[],
    paginationQuery: PaginationQueryDto,
  ) {
    return this.repo_products.getAllByColors(colors, paginationQuery);
  }

  public async getAllProductsByType(
    type: ProductTypes,
    paginationQuery: PaginationQueryDto,
  ) {
    return this.repo_products.getAllByType(type, paginationQuery);
  }
}
