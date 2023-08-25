import { Body, Controller, Post } from '@nestjs/common';
import { JeansTypeService } from './jeans-type.service';
import { JeansTypeDto } from './dto/jeans-type.dto';

@Controller('jeans-type')
export class JeansTypeController {
  constructor(private readonly jeansTypeService: JeansTypeService) {}

  @Post()
  createOne(@Body() jeansTypeDto: JeansTypeDto) {
    // return this.jeansTypeService.create(jeansTypeDto);
  }
}
