import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { JeansTypeEntity } from '../entities/jeans-type.entity';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ProductStatuses } from 'app/products/enums/product-statuses.enum';
import { wrap } from '@mikro-orm/core';
import { PaginationQueryDto } from 'shared/dtos/pagination-query.dto';
import { NewJeansTypeForm } from '../dto/new-jeans-type.form';

@Injectable()
export class JeansTypeRepo extends EntityRepository<JeansTypeEntity> {
  constructor(private readonly manager: EntityManager) {
    super(manager, JeansTypeEntity);
  }

  async updateById(entityToUpdate: JeansTypeEntity, dto: NewJeansTypeForm) {
    const updatedEntity = {
      name: dto.name,
      price: dto.price,
      images: dto.images,
      colors: dto.colors,
      sizes: dto.sizes,
      status: dto.status,
      description: dto.description,
      amount: dto.amount,
      category: dto.category,
      hipGirth: dto.hipGirth,
    };
    console.log(updatedEntity);

    wrap(entityToUpdate).assign(updatedEntity);
    await this.getEntityManager().persistAndFlush(entityToUpdate);

    if (entityToUpdate) {
      return {
        statusCode: HttpStatus.OK,
        message: 'Product has been updated successfully',
      };
    } else {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Product not found or could not be updated',
      };
    }
  }

  async deleteById(id: string) {
    const entityToArchive = await this.getEntityManager().findOneOrFail(
      JeansTypeEntity,
      { id },
    );
    if (!entityToArchive)
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Product not found or could not be deleted',
      };

    wrap(entityToArchive).assign({ status: ProductStatuses.ARCHIVED });
    await this.getEntityManager().persistAndFlush(entityToArchive);

    return {
      statusCode: HttpStatus.OK,
      message: 'Product has been deleted successfully',
    };
  }

  async getById(id: string) {
    try {
      return await this.getEntityManager().findOne(JeansTypeEntity, { id });
    } catch (error) {
      console.error('User not found:', error);
    }
  }

  async addOne(dto: NewJeansTypeForm) {
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
      hipGirth: dto.hipGirth,
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

  public async getAll(paginationQuery: PaginationQueryDto) {
    return this.getEntityManager().findAndCount(
      JeansTypeEntity,
      {},
      { limit: paginationQuery.count, offset: paginationQuery.page },
    );
  }
}
