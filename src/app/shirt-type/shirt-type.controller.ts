import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ShirtTypeService } from './shirt-type.service';
import { ShirtTypeDto } from './dto/shirt-type.dto';
import { PaginationQueryDto } from 'shared/dtos/pagination-query.dto';
import { NewShirtForm } from './dto/new-shirt.form';

@Controller('shirts')
export class ShirtTypeController {
  constructor(private readonly shirtTypeService: ShirtTypeService) {}

  @Post()
  createOne(@Body() shirtTypeDto: ShirtTypeDto) {
    return this.shirtTypeService.addShirtProduct(shirtTypeDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const entity = await this.shirtTypeService.findShirtProduct(id);
    const shirtTypeProduct = ShirtTypeDto.fromEntity(entity);
    return shirtTypeProduct || [];
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    return await this.shirtTypeService.deleteShirtProduct(id);
  }

  @Put(':id')
  async updateOne(@Param('id') id: string, @Body() dtoToUpdate: NewShirtForm) {
    const entityToUpdate = await this.shirtTypeService.findShirtProduct(id);

    const dto = NewShirtForm.from(dtoToUpdate);

    const errors = await NewShirtForm.validateForm(dto);
    if (errors) {
      throw new BadRequestException({
        message: 'errors',
        errors,
      });
    }
    return await this.shirtTypeService.updateShirtProduct(entityToUpdate, dto);
  }

  @Get()
  public async getShirtProducts(@Query() paginationQuery: PaginationQueryDto) {
    const entitiesAndCount = await this.shirtTypeService.getAllShirtProducts(
      paginationQuery,
    );
    const shirtProducts = ShirtTypeDto.fromEntities(entitiesAndCount);
    return shirtProducts || [];
  }
}
