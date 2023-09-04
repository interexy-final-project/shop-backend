import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CartItemDto } from './dto/cart-item.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  create(@Body() createCartDto: CartItemDto) {

    console.log('createCartDto',createCartDto)
    return this.cartService.createNewCartItem(createCartDto);
  }

  @Get('user/:id')
  findAll(@Param('id') id: string) {
    return this.cartService.getCartItems(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.getCartItem(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCartDto: CartItemDto) {
    return this.cartService.updateCartItem(updateCartDto, id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.deleteCartItem(id);
  }
}
