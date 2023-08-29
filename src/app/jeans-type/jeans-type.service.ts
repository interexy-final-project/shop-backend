import { Injectable } from '@nestjs/common';
import { JeansTypeRepo } from './repo/jeans-type.repo';
import { PaginationQueryDto } from 'shared/dtos/pagination-query.dto';
import { JeansTypeEntity } from './entities/jeans-type.entity';
import { NewJeansTypeForm } from './dto/new-jeans-type.form';

@Injectable()
export class JeansTypeService {
  public constructor(private readonly repo_jeans_type: JeansTypeRepo) {}

  public async addJeansProduct(dto: NewJeansTypeForm) {
    return this.repo_jeans_type.addOne(dto);
  }

  public async findJeansProduct(id: string) {
    return this.repo_jeans_type.getById(id);
  }

  public async deleteJeansProduct(id: string) {
    return this.repo_jeans_type.deleteById(id);
  }

  public async updateJeansProduct(
    entityToUpdate: JeansTypeEntity,
    dto: NewJeansTypeForm,
  ) {
    return this.repo_jeans_type.updateById(entityToUpdate, dto);
  }

  public async getAllJeansProducts(paginationQuery: PaginationQueryDto) {
    return this.repo_jeans_type.getAll(paginationQuery);
  }
}
