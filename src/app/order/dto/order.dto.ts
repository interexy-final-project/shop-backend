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
import { OrderEntity } from '../entities/order.entity';

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

  public static fromEntity(entity: OrderEntity){
    if(!entity) {
      return
    }

    const dto = new OrderDto();
    dto.id = entity.id;
    dto.created = entity.created.valueOf();
    dto.updated = entity.updated.valueOf();
    dto.userId = entity.userId;
    dto.total = entity.total;
    dto.paymentMethod = entity.paymentMethod;
    dto.address = entity.address;

    return dto;
  }
}
