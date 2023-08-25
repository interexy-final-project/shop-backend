import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { JeansTypeEntity } from '../entities/jeans-type.entity';
import { JeansTypeDto } from '../dto/jeans-type.dto';
import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class JeansTypeRepo extends EntityRepository<JeansTypeEntity> {
  constructor(private readonly manager: EntityManager) {
    super(manager, JeansTypeEntity);
  }

  async getById(id: string) {
    return await this.findOne({ id });
  }

  async addOne(dto: JeansTypeDto) {
    const newJeans = this.getEntityManager().create(JeansTypeEntity, {
      name: dto.name,
      price: dto.price,
      images: dto.images,
      colors: dto.colors,
      sizes: dto.sizes,
      status: dto.status,
      description: dto.description,
      amount: dto.amount,
      category: dto.category,
      hip_girth: dto.hip_girth,
      created: new Date(),
      updated: new Date(),
    });
    await this.getEntityManager().persistAndFlush(newJeans);

    if (newJeans)
      return {
        statusCode: HttpStatus.OK,
        message: 'jeans-type product has been created',
      };

    return {
      statusCode: HttpStatus.OK,
      message: 'jeans-type product has not been created',
    };
  }
}
