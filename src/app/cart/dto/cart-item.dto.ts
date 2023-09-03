import { ProductDto } from 'app/products/dto/product.dto';
import { UserDto } from 'app/users/dto/user.dto';
import { IsEnum, IsNumber, IsString, ValidateNested } from 'class-validator';
import { UUIDDto } from 'shared/dtos/uuid.dto';
import { CartItemEntity } from '../entities/cart-item.entity';
import { ProductSizes } from 'app/products/enums/product-sizes.enum';
import { ProductColors } from 'app/products/enums/product-colors.enum';

export class CartItemDto extends UUIDDto {
  @IsString()
  userId: string;

  @IsNumber()
  productId: string;

  @IsNumber()
  quantity: number;

  @IsEnum(ProductSizes)
  size!: ProductSizes;

  @IsEnum(ProductColors)
  color!: ProductColors;

  @ValidateNested({ context: UserDto })
  user?: UserDto;

  @ValidateNested({ context: ProductDto })
  product?: ProductDto;

  public static fromEntity(entity: CartItemEntity) {
    if (!entity) {
      return;
    }

    const dto = new CartItemDto();
    dto.id = entity.id;
    dto.created = entity.created.valueOf();
    dto.updated = entity.updated.valueOf();
    dto.productId = entity.productId;
    dto.quantity = entity.quantity;
    dto.userId = entity.userId;
    dto.color = entity.color;
    dto.size = entity.size;

    return dto;
  }

  public static fromEntities(entities: CartItemEntity[]) {
    if (!entities?.map) {
      return;
    }

    return entities.map((entity) => this.fromEntity(entity));
  }
}
