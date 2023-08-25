import { ProductDto } from 'app/products/dto/product.dto';
import { ProductEntity } from 'app/products/entities/product.entity';
import { UserDto } from 'app/users/dto/user.dto';
import { UserEntity } from 'app/users/entities/user.entity';
import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { UUIDDto } from 'shared/dtos/uuid.dto';

export class CartItemDto extends UUIDDto {
  @IsString()
  orderId: string;

  @IsNumber()
  productId: number;

  @IsNumber()
  quantity: number;

  @ValidateNested({ context: UserDto })
  user?: UserDto;

  @ValidateNested({ context: ProductDto })
  product?: ProductDto;
}
