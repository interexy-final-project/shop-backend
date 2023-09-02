import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { TShirtTypeEntity } from '../entities/t-shirt.entity';
import { NewTShirtTypeForm } from '../dto/new-t-shirt.form';
import { HttpStatus, Injectable } from '@nestjs/common';
import { PaginationQueryDto } from 'shared/dtos/pagination-query.dto';
import { ProductStatuses } from 'app/products/enums/product-statuses.enum';
import { wrap } from '@mikro-orm/core';

@Injectable()
export class TShirtTypeRepo extends EntityRepository<TShirtTypeEntity> {
  constructor(private readonly manager: EntityManager) {
    super(manager, TShirtTypeEntity);
  }
  async getAll(paginationQuery: PaginationQueryDto) {
    const { page, count } = paginationQuery;

    return this.getEntityManager().findAndCount(
      TShirtTypeEntity,
      {},
      { limit: count ?? 10, offset: page * count ?? 0 },
    );
  }

  async getById(id: string) {
    try {
      return await this.getEntityManager().findOne(TShirtTypeEntity, {
        id,
      });
    } catch (error) {}
  }

  async addOne(dto: NewTShirtTypeForm) {
    const newTShirt = this.getEntityManager().create(TShirtTypeEntity, {
      name: dto.name,
      price: dto.price,
      images: dto.images,
      colors: dto.colors,
      sizes: dto.sizes,
      status: dto.status,
      description: dto.description,
      amount: dto.amount,
      category: dto.category,
      waistGirth: dto.waistGirth,
    });
    await this.getEntityManager().persistAndFlush(newTShirt);

    if (newTShirt)
      return {
        statusCode: HttpStatus.OK,
        message: 'jeans-type product has been created',
      };

    return {
      statusCode: HttpStatus.OK,
      message: 'jeans-type product has not been created',
    };
  }

  async deleteById(id: string) {
    const entityToArchive = await this.getEntityManager().findOne(
      TShirtTypeEntity,
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

  async updateById(entityToUpdate: TShirtTypeEntity, dto: NewTShirtTypeForm) {
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
      waistGirth: dto.waistGirth,
    };

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
}
