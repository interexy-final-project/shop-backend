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
import { NewTShirtTypeForm } from './dto/new-t-shirt.form';
import { TShirtTypeService } from './t-shirt-type.service';
import { TShirtTypeDto } from './dto/t-shirt.dto';
import { PaginationQueryDto } from 'shared/dtos/pagination-query.dto';
import { ErrorCodes } from 'shared/enums/error-codes.enum';

@Controller('t-shirt-type')
export class TShirtTypeController {
  constructor(private readonly tshirtTypeService: TShirtTypeService) {}
  @Post()
  async createOne(@Body() body: NewTShirtTypeForm) {
    const dto = NewTShirtTypeForm.from(body);
    const errors = await NewTShirtTypeForm.validate(dto);
    if (errors) {
      throw new BadRequestException({
        message: ErrorCodes.InvalidForm,
        errors,
      });
    }

    return this.tshirtTypeService.addTShirtProduct(dto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const entity = await this.tshirtTypeService.findTShirtProduct(id);

    if (!entity)
      throw new BadRequestException({
        message: ErrorCodes.Wrong_Id,
      });

    const jeansTypeProduct = TShirtTypeDto.fromEntity(entity);
    return jeansTypeProduct || [];
  }

  @Get()
  public async getTShirtProducts(@Query() paginationQuery: PaginationQueryDto) {
    const entitiesAndCount = await this.tshirtTypeService.getAllTShirtProducts(
      paginationQuery,
    );
    const jeansProducts = TShirtTypeDto.fromEntities(entitiesAndCount[0]);
    return { products: jeansProducts, count: entitiesAndCount[1] } || [];
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    return await this.tshirtTypeService.deleteTShirtProduct(id);
  }

  @Put(':id')
  async updateOne(@Param('id') id: string, @Body() body: NewTShirtTypeForm) {
    const dto = NewTShirtTypeForm.from(body);
    const errors = await NewTShirtTypeForm.validate(dto);
    if (errors) {
      throw new BadRequestException({
        message: ErrorCodes.InvalidForm,
        errors,
      });
    }

    const entityToUpdate = await this.tshirtTypeService.findTShirtProduct(id);

    return await this.tshirtTypeService.updateTShirtProduct(
      entityToUpdate,
      dto,
    );
  }
}
