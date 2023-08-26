import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { JeansTypeService } from './jeans-type.service';
import { JeansTypeDto } from './dto/jeans-type.dto';

@Controller('jeans-type')
export class JeansTypeController {
  constructor(private readonly jeansTypeService: JeansTypeService) {}

  @Post()
  createOne(@Body() jeansTypeDto: JeansTypeDto) {
    return this.jeansTypeService.addJeansProduct(jeansTypeDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const entity = await this.jeansTypeService.findJeansProduct(id);
    const jeansTypeProduct = JeansTypeDto.fromEntity(entity);
    return jeansTypeProduct || [];
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    return await this.jeansTypeService.deleteJeansProduct(id);
  }

  @Put(':id')
  async updateOne(@Param('id') id: string, @Body() dtoToUpdate: JeansTypeDto) {
    return await this.jeansTypeService.updateJeansProduct(id, dtoToUpdate);
  }
}
