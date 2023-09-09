import { Body, Controller, Get, Param, Put, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from './dto/product.dto';
import { PaginationQueryDto } from 'shared/dtos/pagination-query.dto';
import { ProductCategories } from './enums/product-categories.enum';
import { ProductColors } from './enums/product-colors.enum';
import { ProductSizes } from './enums/product-sizes.enum';
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
    @Query('price') price: 'asc' | 'desc',

    @Query() paginationQuery: PaginationQueryDto,
  ) {
    const entities = await this.productsService.getAllProductsByFilters(
      category,
      sizes,
      colors,
      type,
      price,
      paginationQuery,
    );
    const products = ProductDto.fromEntities(entities);
    return products || [];
  }

  @Get()
  async getProducts(
    @Query('page') page,
    @Query('count') count,
    @Query('sortBy') orderBy,
    @Query('direction') direction,
  ) {
    const entities = await this.productsService.getAllProducts({
      page,
      count,
      orderBy,
      direction,
    });
    const products = ProductDto.fromEntities(entities);
    return products || [];
  }

  @Put()
  //TODO mb should add queries for consistent displaying
  async updateProducts(@Body() ids: string[]) {
    await this.productsService.updateProducts(ids);

    return await this.productsService.getAllProducts();
  }

  @Get()
  public async getAllProductsByCategory(
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

  // ПОЛУЧАЕМ ТИПЫ КАТЕГОРИИ (ДЖИНСЫ, МАЙКИ, РУБАШКИ)

  @Get('types')
  public async getAllTypes(
    @Query('category') category: ProductCategories,
    @Query('type') type: ProductTypes,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    const entities = await this.productsService.getAllTypes(type);
    const types = ProductDto.fromEntities(entities);
    return types || [];
  }
}
