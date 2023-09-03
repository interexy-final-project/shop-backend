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
import { OrderItemEntity } from '../entities/order-item.entity';
import { ProductColors } from 'app/products/enums/product-colors.enum';
import { ProductSizes } from 'app/products/enums/product-sizes.enum';

export class OrderItemDto extends UUIDDto {
  @IsString()
  orderId: string;

  @IsJSON()
  product: object;

  @IsNumber()
  quantity: number;

  @IsEnum(ProductSizes)
  size!: ProductSizes;

  @IsEnum(ProductColors)
  color!: ProductColors;

  @ValidateNested({ context: OrderDto })
  order?: OrderDto;

  public static fromEntity(entity: OrderItemEntity): OrderItemDto {
    if (!entity) {
      return;
    }
    return {
      updated: entity.updated.valueOf(),
      created: entity.created.valueOf(),
      id: entity.id,
      orderId: entity.orderId,
      product: entity.product,
      quantity: entity.quantity,
      size: entity.size,
      color: entity.color,
    };
  }
}
