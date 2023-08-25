import { OrderItemEntity } from 'app/order-item/entities/order-item.entity';
import { UserEntity } from 'app/users/entities/user.entity';
import { UUIDDto } from 'shared/dtos/uuid.dto';
import { OrderStatuses } from '../enums/order-statuses.enum';
import { PaymentMethods } from '../enums/payment-methods.enum';
import {
  IsArray,
  IsEnum,
  IsJSON,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UserDto } from 'app/users/dto/user.dto';
import { OrderItemDto } from 'app/order-item/dto/order-item.dto';

export class OrderDto extends UUIDDto {
  @IsString()
  userId: string;

  @IsNumber()
  total: number;

  @IsEnum(OrderStatuses)
  status!: OrderStatuses;

  @IsJSON()
  address: object;

  @IsEnum(PaymentMethods)
  paymentMethod!: PaymentMethods;

  @ValidateNested({ context: UserDto })
  user?: UserDto;

  @IsArray()
  @ValidateNested({ context: OrderItemDto })
  items?: OrderItemDto[];
}
