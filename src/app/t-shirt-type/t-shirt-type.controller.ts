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

import { I18n, I18nContext } from 'nestjs-i18n';

@Controller('t-shirt-type')
export class TShirtTypeController {
  constructor(private readonly tshirtTypeService: TShirtTypeService) {}
  @Post()
  async createOne(@Body() body: NewTShirtTypeForm, @I18n() i18n: I18nContext) {
    const dto = NewTShirtTypeForm.from(body);
    const errors = await NewTShirtTypeForm.validate(dto);
    if (errors) {
      throw new BadRequestException({
        message: i18n.t('test.invalidForm'),
        errors,
      });
    }

    return this.tshirtTypeService.addTShirtProduct(dto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @I18n() i18n: I18nContext) {
    const entity = await this.tshirtTypeService.findTShirtProduct(id);

    if (!entity)
      throw new BadRequestException({
        message: i18n.t('test.wrongId'),
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
  async updateOne(
    @Param('id') id: string,
    @Body() body: NewTShirtTypeForm,
    @I18n() i18n: I18nContext,
  ) {
    const dto = NewTShirtTypeForm.from(body);
    const errors = await NewTShirtTypeForm.validate(dto);
    if (errors) {
      throw new BadRequestException({
        message: i18n.t('test.invalidForm'),
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
