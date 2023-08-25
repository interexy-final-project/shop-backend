import { ProductEntity } from 'app/products/entities/product.entity';
import { IsString } from 'class-validator';

export class TShirtTypeDto extends ProductEntity {
  @IsString()
  waist_girth?: string;
}
