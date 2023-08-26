import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './dto/order.dto';
import { OrderStatuses } from './enums/order-statuses.enum';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: OrderDto, userId: string) {
    return this.orderService.createOrder(createOrderDto, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Body() status: OrderStatuses) {
    return this.orderService.getOrderByUserIdAndStatus(id, status);
  }

  @Put(':id')
  update(@Param('id') id: string) {
    return this.orderService.updateOrder(id);
  }
}
