import { OrderDto } from 'app/order/dto/order.dto';
import { OrderEntity } from 'app/order/entities/order.entity';
import { OrderStatuses } from 'app/order/enums/order-statuses.enum';
import {
  IsEnum,
  IsJSON,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UUIDDto } from 'shared/dtos/uuid.dto';

export class OrderItemDto extends UUIDDto {
  @IsString()
  orderId: string;

  @IsJSON()
  product: object;

  @IsNumber()
  quantity: number;

  @IsEnum(OrderStatuses)
  status!: OrderStatuses;

  @ValidateNested({ context: OrderDto })
  order?: OrderDto;
}
