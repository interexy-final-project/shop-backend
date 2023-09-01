import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { ShirtTypeEntity } from '../entities/shirt-type.entity';
import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { ShirtTypeDto } from '../dto/shirt-type.dto';
import { wrap } from '@mikro-orm/core';
import { PaginationQueryDto } from 'shared/dtos/pagination-query.dto';
import { ProductStatuses } from 'app/products/enums/product-statuses.enum';
import { NewShirtForm } from '../dto/new-shirt.form';

@Injectable()
export class ShirtTypeRepo extends EntityRepository<ShirtTypeEntity> {
  constructor(private readonly manager: EntityManager) {
    super(manager, ShirtTypeEntity);
  }

  async updateById(entityToUpdate: ShirtTypeEntity, dtoToUpdate: NewShirtForm) {
    const updateEntity = {
      name: dtoToUpdate.name,
      price: dtoToUpdate.price,
      images: dtoToUpdate.images,
      colors: dtoToUpdate.colors,
      sizes: dtoToUpdate.sizes,
      status: dtoToUpdate.status,
      description: dtoToUpdate.description,
      amount: dtoToUpdate.amount,
      category: dtoToUpdate.category,
      sleeveLength: dtoToUpdate.sleeveLength,
    };

    wrap(entityToUpdate).assign(updateEntity);

    await this.getEntityManager().persistAndFlush(entityToUpdate);

    console.log(entityToUpdate);
    console.log(updateEntity);

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
    const entityToArchive = await this.getEntityManager().findOne(
      ShirtTypeEntity,
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
    return await this.getEntityManager().findOneOrFail(ShirtTypeEntity, { id });
  }

  async addOne(dto: ShirtTypeDto) {
    const newShirt = this.getEntityManager().create(ShirtTypeEntity, {
      name: dto.name,
      price: dto.price,
      images: dto.images,
      colors: dto.colors,
      sizes: dto.sizes,
      status: dto.status,
      description: dto.description,
      amount: dto.amount,
      category: dto.category,
      sleeve_Length: dto.sleeveLength,
      created: new Date(),
      updated: new Date(),
    });
    await this.getEntityManager().persistAndFlush(newShirt);

    if (newShirt)
      return {
        statusCode: HttpStatus.OK,
        message: 'Shirt product has been created',
      };

    return {
      statusCode: HttpStatus.OK,
      message: 'Shirt product has not been created',
    };
  }

  public async getAll(paginationQuery: PaginationQueryDto) {
    const { page, count } = paginationQuery;
    return this.getEntityManager().findAndCount(
      ShirtTypeEntity,
      {},
      { limit: count ?? 10, offset: page * count ?? 0 },
    );
  }
}
