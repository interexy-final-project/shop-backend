import { Injectable } from '@nestjs/common';
import { JeansTypeRepo } from './repo/jeans-type.repo';
import { JeansTypeDto } from './dto/jeans-type.dto';
import { PaginationQueryDto } from 'shared/dtos/pagination-query.dto';

@Injectable()
export class JeansTypeService {
  public constructor(private readonly repo_jeans_type: JeansTypeRepo) {}

  public async addJeansProduct(dto: JeansTypeDto) {
    return this.repo_jeans_type.addOne(dto);
  }

  public async findJeansProduct(id: string) {
    return this.repo_jeans_type.getById(id);
  }

  public async deleteJeansProduct(id: string) {
    return this.repo_jeans_type.deleteById(id);
  }

  public async updateJeansProduct(id: string, dtoToUpdate: JeansTypeDto) {
    return this.repo_jeans_type.updateById(id, dtoToUpdate);
  }

  public async getAllJeansProducts(paginationQuery: PaginationQueryDto) {
    return this.repo_jeans_type.getAll(paginationQuery);
  }
}
