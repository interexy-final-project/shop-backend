import { CartItemEntity } from 'app/cart/entities/cart-item.entity';
import { OrderEntity } from 'app/order/entities/order.entity';
import { ShippingAddressEntity } from 'app/shipping-address/entities/shipping-address.entity';
import { UserRoleEntity } from 'app/user-roles/entities/user-role.entity';
import { UUIDEntity } from 'shared/entities/uuid.entity';
import { EUserStatuses } from '../enums/user-statuses.enum';
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

export class UserDto extends UUIDDto {
  @IsString()
  firstName: string;

  @IsString()
  secondName: string;

  @IsString()
  email!: string;

  @IsString()
  password!: string;

  @IsEnum(EUserStatuses)
  status!: EUserStatuses;

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
}
