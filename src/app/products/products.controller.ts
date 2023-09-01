import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from './dto/product.dto';
import { PaginationQueryDto } from 'shared/dtos/pagination-query.dto';
import { ProductCategories } from './enums/product-categories.enum';
import { ProductSizes } from './enums/product-sizes.enum';
import { ProductColors } from './enums/product-colors.enum';
import { ProductTypes } from './enums/product-types.enum';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get('byFilters')
  public async getProductsByFilters(
    @Query('category') category: ProductCategories,
    @Query('sizes') sizes: ProductSizes[],
    @Query('colors') colors: ProductColors[],
    @Query('type') type: ProductTypes,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    const entities = await this.productsService.getAllProductsByFilters(
      category,
      sizes,
      colors,
      type,
      paginationQuery,
    );
    const products = ProductDto.fromEntities(entities);
    return products || [];
  }
}
