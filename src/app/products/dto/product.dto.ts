import {
  IsArray,
  IsEnum,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { BaseEntity } from 'shared/entities/base.entity';
import { EProductColors } from '../enums/product-colors.enum';
import { EProductSizes } from '../enums/product-sizes.enum';
import { EProductStatuses } from '../enums/product-statuses.enum';
import { CartItemDto } from 'app/cart/dto/cart-item.dto';
import { ProductEntity } from '../entities/product.entity';
import { UUIDDto } from 'shared/dtos/uuid.dto';

export class ProductDto extends UUIDDto {
  @IsString()
  name!: string;

  @IsNumber()
  price!: number;

  @IsString()
  @IsArray()
  images!: string[];

  @IsEnum(EProductColors)
  @IsArray()
  colors!: EProductColors[];

  @IsEnum(EProductSizes)
  @IsArray()
  sizes!: EProductSizes[];

  @IsEnum(EProductStatuses)
  status!: EProductStatuses;

  @IsString()
  description: string;

  @IsNumber()
  amount!: number;

  @IsString()
  category!: string;

  @ValidateNested({ context: CartItemDto })
  cartItem?: CartItemDto[];

  public static fromEntity(entity?: ProductEntity) {
    if (!entity) {
      return;
    }

    const it = new ProductDto();
    it.id = entity.id;
    it.name = entity.name;
    it.description = entity.description;
    it.images = entity.images;
    it.colors = entity.colors;
    it.sizes = entity.sizes;
    it.price = entity.price;
    it.status = entity.status;
    it.amount = entity.amount;
    it.category = entity.category;
    it.created = entity.created.valueOf();
    it.updated = entity.updated.valueOf();
    // it.cartItem = CartItemDto.fromEntities(entity.cartItem);

    return it;
  }

  public static fromEntities(entities?: ProductEntity[]) {
    if (!entities?.map) {
      return;
    }

    return entities.map((entity) => this.fromEntity(entity));
  }
}
