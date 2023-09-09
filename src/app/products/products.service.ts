import { Injectable } from '@nestjs/common';
import { ProductsRepo } from './repo/products.repo';
import { PaginationQueryDto } from 'shared/dtos/pagination-query.dto';
import { ProductsPaginationQueryDto } from './dto/products-pagination-query.dto';
import { ProductCategories } from './enums/product-categories.enum';
import { ProductColors } from './enums/product-colors.enum';
import { ProductSizes } from './enums/product-sizes.enum';
import { ProductTypes } from './enums/product-types.enum';

@Injectable()
export class ProductsService {
  constructor(private readonly repo_products: ProductsRepo) {}

  public async getAllProductsByFilters(
    category: ProductCategories,
    sizes: ProductSizes[],
    colors: ProductColors[],
    type: ProductTypes,
    price: 'asc' | 'desc',
    paginationQuery: PaginationQueryDto,
  ) {
    return this.repo_products.getAll(
      category,
      sizes,
      colors,
      type,
      price,
      paginationQuery,
    );
  }

  async getAllProducts(queryParams?: ProductsPaginationQueryDto) {
    return await this.repo_products.getAllProducts(queryParams);
  }

  // ПОЛУЧАЕМ ТИПЫ КАТЕГОРИИ (ДЖИНСЫ, МАЙКИ, РУБАШКИ)

  public async getAllTypes(type: ProductTypes) {
    return this.repo_products.getAllTypes(type);
  }

  async updateProducts(ids: string[]) {
    return await this.repo_products.updateProducts(ids);
  }

  public async getAllProductsByCategory(
    category: string,
    paginationQuery: PaginationQueryDto,
  ) {
    return this.repo_products.getAllProductsByCategory(
      category,
      paginationQuery,
    );
  }
}
