import { Injectable } from '@nestjs/common';
import { ProductsRepo } from './repo/products.repo';

@Injectable()
export class ProductsService {
  constructor(private readonly repo_products: ProductsRepo) {}

  public async getAllProducts() {
    return this.repo_products.getAll();
  }
}
