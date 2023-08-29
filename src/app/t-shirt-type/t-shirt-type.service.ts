import { Injectable } from '@nestjs/common';
import { NewTShirtTypeForm } from './dto/new-t-shirt.form';
import { TShirtTypeRepo } from './repo/t-shirt-type.repo';
import { PaginationQueryDto } from 'shared/dtos/pagination-query.dto';
import { TShirtTypeEntity } from './entities/t-shirt.entity';

@Injectable()
export class TShirtTypeService {
  public constructor(private readonly repo_tshirt_type: TShirtTypeRepo) {}
  public async addTShirtProduct(dto: NewTShirtTypeForm) {
    return this.repo_tshirt_type.addOne(dto);
  }

  public async findTShirtProduct(id: string) {
    return this.repo_tshirt_type.getById(id);
  }

  public async getAllTShirtProducts(paginationQuery: PaginationQueryDto) {
    return this.repo_tshirt_type.getAll(paginationQuery);
  }

  public async deleteTShirtProduct(id: string) {
    return this.repo_tshirt_type.deleteById(id);
  }

  public async updateTShirtProduct(
    entityToUpdate: TShirtTypeEntity,
    dto: NewTShirtTypeForm,
  ) {
    return this.repo_tshirt_type.updateById(entityToUpdate, dto);
  }
}
