import { CartItemDto } from 'app/cart/dto/cart-item.dto';
import { ProductCategories } from 'app/products/enums/product-categories.enum';
import { ProductColors } from 'app/products/enums/product-colors.enum';
import { ProductSizes } from 'app/products/enums/product-sizes.enum';
import { ProductStatuses } from 'app/products/enums/product-statuses.enum';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UUIDDto } from 'shared/dtos/uuid.dto';

export class JeansTypeDto extends UUIDDto {
  @IsString()
  name!: string;

  @IsNumber()
  price!: number;

  @IsString()
  @IsArray()
  images!: string[];

  @IsEnum(ProductColors)
  @IsArray()
  colors!: ProductColors[];

  @IsEnum(ProductSizes)
  @IsArray()
  sizes!: ProductSizes[];

  @IsEnum(ProductStatuses)
  status!: ProductStatuses;

  @IsString()
  description: string;

  @IsNumber()
  amount!: number;

  @IsEnum(ProductCategories)
  category!: ProductCategories;

  @ValidateNested({ context: CartItemDto })
  cartItem?: CartItemDto;
  @IsString()
  hip_girth?: string;
}
