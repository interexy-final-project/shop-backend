import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ShirtTypeEntity } from './entities/shirt-type.entity';
import { ShirtTypeController } from './shirt-type.controller';
import { ShirtTypeService } from './shirt-type.service';
import { ShirtTypeRepo } from './repo/shirt-type.repo';

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [ShirtTypeEntity],
    }),
  ],
  controllers: [ShirtTypeController],
  providers: [ShirtTypeService, ShirtTypeRepo],
})
export class ShirtTypeModule {}
