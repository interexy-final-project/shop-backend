import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Sizes } from '../entities/sizes.entity';
import { Colors } from '../entities/colors.entity';

@Injectable()
export class FetchPropertiesRepo {
  constructor(private readonly em: EntityManager) {}

  async getSizes() {
    return await this.em.find(Sizes, {});
  }

  async getColors() {
    return await this.em.find(Colors, {});
  }
}
