import { Injectable } from '@nestjs/common';
import { ProductsRepo } from './repo/products.repo';
import { PaginationQueryDto } from 'shared/dtos/pagination-query.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly repo_products: ProductsRepo) {}

  public async getAllProducts() {
    return this.repo_products.getAll();
  }

  public async getAllProductsByCategory(
    category: string,
    paginationQuery: PaginationQueryDto,
  ) {
    return this.repo_products.getAllByCategory(category, paginationQuery);
  }
}
