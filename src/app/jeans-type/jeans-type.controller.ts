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
import { JeansTypeService } from './jeans-type.service';
import { JeansTypeDto } from './dto/jeans-type.dto';
import { PaginationQueryDto } from 'shared/dtos/pagination-query.dto';
import { NewJeansTypeForm } from './dto/new-jeans-type.form';
import { ErrorCodes } from 'shared/enums/error-codes.enum';

@Controller('jeans-type')
export class JeansTypeController {
  constructor(private readonly jeansTypeService: JeansTypeService) {}

  @Post()
  async createOne(@Body() body: NewJeansTypeForm) {
    const dto = NewJeansTypeForm.from(body);
    const errors = await NewJeansTypeForm.validate(dto);
    if (errors) {
      throw new BadRequestException({
        message: ErrorCodes.InvalidForm,
        errors,
      });
    }

    return this.jeansTypeService.addJeansProduct(dto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const entity = await this.jeansTypeService.findJeansProduct(id);

    if (!entity)
      throw new BadRequestException({
        message: ErrorCodes.Wrong_Id,
      });

    const jeansTypeProduct = JeansTypeDto.fromEntity(entity);
    return jeansTypeProduct || [];
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    return await this.jeansTypeService.deleteJeansProduct(id);
  }

  @Put(':id')
  async updateOne(@Param('id') id: string, @Body() body: NewJeansTypeForm) {
    const dto = NewJeansTypeForm.from(body);
    const errors = await NewJeansTypeForm.validate(dto);
    if (errors) {
      throw new BadRequestException({
        message: ErrorCodes.InvalidForm,
        errors,
      });
    }

    const entityToUpdate = await this.jeansTypeService.findJeansProduct(id);

    if (!entityToUpdate) {
      throw new BadRequestException({
        message: ErrorCodes.Wrong_Id,
        errors,
      });
    }
    return await this.jeansTypeService.updateJeansProduct(entityToUpdate, dto);
  }

  @Get()
  public async getJeansProducts(@Query() paginationQuery: PaginationQueryDto) {
    const entitiesAndCount = await this.jeansTypeService.getAllJeansProducts(
      paginationQuery,
    );
    const jeansProducts = JeansTypeDto.fromEntities(entitiesAndCount);
    return { products: jeansProducts, count: entitiesAndCount[1] } || [];
  }
}
