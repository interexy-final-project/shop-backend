import { Module } from '@nestjs/common';
import { TShirtTypeController } from './t-shirt-type.controller';
import { TShirtTypeService } from './t-shirt-type.service';
import { TShirtTypeRepo } from './repo/t-shirt-type.repo';

@Module({
  controllers: [TShirtTypeController],
  providers: [TShirtTypeService, TShirtTypeService, TShirtTypeRepo],
})
export class TShirtTypeModule {}
