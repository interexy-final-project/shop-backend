import { Injectable } from '@nestjs/common';
import { ProductsRepo } from './repo/products.repo';
import { PaginationQueryDto } from 'shared/dtos/pagination-query.dto';
import { ProductsPaginationQueryDto } from './dto/products-pagination-query.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly repo_products: ProductsRepo) {}

  async getAllProducts(queryParams?: ProductsPaginationQueryDto) {
    return await this.repo_products.getAllProducts(queryParams);
  }

  async updateProducts(ids: string[]) {
    return await this.repo_products.updateProducts(ids);
  }

  public async getAllProductsByCategory(
    category: string,
    paginationQuery: PaginationQueryDto,
  ) {
    return this.repo_products.getAllByCategory(category, paginationQuery);
  }
}
