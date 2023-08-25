import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
  findOne(@Param('id') id: string) {
    return this.jeansTypeService.findJeansProduct(id);
  }
}
