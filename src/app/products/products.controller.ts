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
  @Get()
  public async getProducts(
    @Query('category') category: ProductCategories,
    @Query('sizes') sizes: ProductSizes[],
    @Query('colors') colors: ProductColors[],
    @Query('type') type: ProductTypes,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    const entities = await this.productsService.getAllProducts(
      category,
      sizes,
      colors,
      type,
      paginationQuery,
    );
    const products = ProductDto.fromEntities(entities);
    return products || [];
  }

  @Get('byCategory/:category')
  public async getByCategory(
    @Param('category') category: ProductCategories,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    const entitiesAndCount =
      await this.productsService.getAllProductsByCategory(
        category,
        paginationQuery,
      );
    const products = ProductDto.fromEntities(entitiesAndCount);
    return products || [];
  }

  @Get('bySizes')
  public async getBySizes(
    @Query('sizes') sizes: ProductSizes[],
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    const entitiesAndCount = await this.productsService.getAllProductsBySizes(
      sizes,
      paginationQuery,
    );
    const products = ProductDto.fromEntities(entitiesAndCount);
    return products || [];
  }

  @Get('byColors')
  public async getByColors(
    @Query('colors') colors: ProductColors[],
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    const entitiesAndCount = await this.productsService.getAllProductsByColors(
      colors,
      paginationQuery,
    );
    const products = ProductDto.fromEntities(entitiesAndCount);
    return products || [];
  }

  @Get('byType/:type')
  public async getByType(
    @Param('type') type: ProductTypes,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    const entitiesAndCount = await this.productsService.getAllProductsByType(
      type,
      paginationQuery,
    );
    const products = ProductDto.fromEntities(entitiesAndCount);
    return products || [];
  }
}
