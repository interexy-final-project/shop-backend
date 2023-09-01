import { Body, Controller, Get, Param, Put, Query } from '@nestjs/common';
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
  @Get()
  async getProducts(
    @Query('page') page,
    @Query('count') count,
    @Query('sortBy') orderBy,
    @Query('direction') direction,

  ) {
    const entities = await this.productsService.getAllProducts({ page, count, orderBy, direction});
    const products = ProductDto.fromEntities(entities);
    return products || [];
  }

  @Put()
  //TODO mb should add queries for consistent displaying
  async updateProducts(@Body() ids: string[]) {
    await this.productsService.updateProducts(ids);
    
    return await this.productsService.getAllProducts();
  }

  @Get(':category')
  public async getByCategory(
    @Param('category') category: string,
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
