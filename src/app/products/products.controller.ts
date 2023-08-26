import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from './dto/product.dto';
import { PaginationQueryDto } from 'shared/dtos/pagination-query.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  public async getProducts() {
    const entities = await this.productsService.getAllProducts();
    const products = ProductDto.fromEntities(entities);
    return products || [];
  }

  @Get(':category')
  public async getByCategory(
    @Param('category') category: string,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    const entitiesAndCount =
      await this.productsService.getAllProductsByCategory(
        category,
        paginationQuery,
      );
    const products = ProductDto.fromEntities(entitiesAndCount[0]);
    return products || [];
  }
}
