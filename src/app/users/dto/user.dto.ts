import { UserStatuses } from '../enums/user-statuses.enum';
import { UUIDDto } from 'shared/dtos/uuid.dto';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UserRoleDto } from 'app/user-roles/dto/user-role.dto';
import { ShippingAddressDto } from 'app/shipping-address/dto/shipping-address.dto';
import { OrderDto } from 'app/order/dto/order.dto';
import { CartItemDto } from 'app/cart/dto/cart-item.dto';
import { UserEntity } from '../entities/user.entity';

export class UserDto extends UUIDDto {
  @IsString()
  firstName: string;

  @IsString()
  secondName: string;

  @IsString()
  email!: string;

  @IsString()
  rtHash?: string;

  @IsString()
  password!: string;

  @IsEnum(UserStatuses)
  status!: UserStatuses;

  @IsNumber()
  roleId!: number;

  @ValidateNested({ context: UserRoleDto })
  role?: UserRoleDto;

  @IsArray()
  @ValidateNested({ context: ShippingAddressDto })
  addresses?: ShippingAddressDto[];

  @IsArray()
  @ValidateNested({ context: OrderDto })
  orders?: OrderDto[];

  @IsArray()
  @ValidateNested({ context: CartItemDto })
  cartItems?: CartItemDto[];

  static fromEntity(entity?: UserEntity) {
    if (!entity) {
      return;
    }
    const it = new UserDto();
    it.id = entity.id;
    it.created = entity.created.valueOf();
    it.updated = entity.updated.valueOf();
    it.email = entity.email;

    return it;
  }

  static fromEntities(entities?: UserEntity[]) {
    if (!entities?.map) {
      return;
    }
    return entities.map((entity) => this.fromEntity(entity));
  }
}
