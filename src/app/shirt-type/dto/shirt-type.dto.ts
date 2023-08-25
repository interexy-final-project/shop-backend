import { ProductDto } from 'app/products/dto/product.dto';
import { ProductEntity } from 'app/products/entities/product.entity';
import { IsString } from 'class-validator';

export class ShirtTypeDto extends ProductDto {
  @IsString()
  sleeve_girth?: string;
}
