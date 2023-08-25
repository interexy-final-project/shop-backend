import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from './dto/product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  public async getProducts() {
    const entities = await this.productsService.getAllProducts();
    const products = ProductDto.fromEntities(entities);
    return products || [];
  }
}
