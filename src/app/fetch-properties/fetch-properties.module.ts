import { Module } from '@nestjs/common';
import { FetchPropertiesService } from './fetch-properties.service';
import { FetchPropertiesController } from './fetch-properties.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Sizes } from './entities/sizes.entity';
import { FetchPropertiesRepo } from './repo/fetch-properties.repo';
import { Colors } from './entities/colors.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [Colors, Sizes],
    }),
  ],
  controllers: [FetchPropertiesController],
  providers: [FetchPropertiesService, FetchPropertiesRepo],
})
export class FetchPropertiesModule {}
