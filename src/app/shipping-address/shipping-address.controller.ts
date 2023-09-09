import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ShippingAddressService } from './shipping-address.service';
import { NewShippingAddressForm } from './dto/new-shipping-address.form';
import { ErrorCodes } from 'shared/enums/error-codes.enum';

@Controller('shipping-address')
export class ShippingAddressController {
  constructor(
    private readonly shippingAddressService: ShippingAddressService,
  ) {}

  @Get(':userId')
  async findOne(@Param('userId') userId: string) {
    const result = await this.shippingAddressService.getShippingAddress(userId);
    if (!result) throw new NotFoundException('Address not found');

    return result;
  }

  @Post()
  async createOne(@Body() body: NewShippingAddressForm) {
    const dto = NewShippingAddressForm.from(body);
    const errors = await NewShippingAddressForm.validate(dto);
    if (errors) {
      throw new BadRequestException({
        message: ErrorCodes.InvalidForm,
      });
    }
    return this.shippingAddressService.addShippingAddress(dto);
  }
}
