import { Module } from '@nestjs/common';
import { JeansTypeService } from './jeans-type.service';
import { JeansTypeController } from './jeans-type.controller';

@Module({
  controllers: [JeansTypeController],
  providers: [JeansTypeService],
})
export class JeansTypeModule {}
