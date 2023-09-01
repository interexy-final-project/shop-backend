import { Injectable } from '@nestjs/common';
import { ShirtTypeDto } from './dto/shirt-type.dto';
import { PaginationQueryDto } from 'shared/dtos/pagination-query.dto';
import { ShirtTypeRepo } from './repo/shirt-type.repo';
import { NewShirtForm } from './dto/new-shirt.form';
import { ShirtTypeEntity } from './entities/shirt-type.entity';

@Injectable()
export class ShirtTypeService {
  public constructor(private readonly repo_shirt_type: ShirtTypeRepo) {}

  public async addShirtProduct(dto: ShirtTypeDto) {
    return this.repo_shirt_type.addOne(dto);
  }

  public async findShirtProduct(id: string) {
    return this.repo_shirt_type.getById(id);
  }

  public async deleteShirtProduct(id: string) {
    return this.repo_shirt_type.deleteById(id);
  }

  public async updateShirtProduct(
    entityToUpdate: ShirtTypeEntity,
    dtoToUpdate: NewShirtForm,
  ) {
    return this.repo_shirt_type.updateById(entityToUpdate, dtoToUpdate);
  }

  public async getAllShirtProducts(paginationQuery: PaginationQueryDto) {
    return this.repo_shirt_type.getAll(paginationQuery);
  }
}
