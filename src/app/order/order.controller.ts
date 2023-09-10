import { Controller, Get, Post, Body, Put, Param, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './dto/order.dto';
import { OrderStatuses } from './enums/order-statuses.enum';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getAll(
    @Query('page') page,
    @Query('count') count,
    @Query('sortBy') orderBy,
    @Query('direction') direction,
  ) {
    const entities = await this.orderService.getOrders({
      page,
      count,
      orderBy,
      direction,
    });
    const orders = OrderDto.fromEntities(entities);
    return orders || [];
  }

  @Post()
  async create(@Body() createOrderDto: OrderDto) {
    return await this.orderService.createOrder(createOrderDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Body() status: OrderStatuses) {
    return await this.orderService.getOrderByUserIdAndStatus(id, status);
  }

  @Put()
  async update(@Body() ids: string[]) {
    //TODO mb should add queries for consistent displaying
    await this.orderService.updateOrder(ids);

    return await this.orderService.getOrders();
  }
}
