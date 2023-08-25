import { Module } from '@nestjs/common';
import { JeansTypeService } from './jeans-type.service';
import { JeansTypeController } from './jeans-type.controller';
import { JeansTypeRepo } from './repo/jeans-type.repo';
import { JeansTypeEntity } from './entities/jeans-type.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [JeansTypeEntity],
    }),
  ],
  controllers: [JeansTypeController],
  providers: [JeansTypeService, JeansTypeRepo],
})
export class JeansTypeModule {}
