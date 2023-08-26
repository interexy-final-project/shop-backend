import { ProductDto } from 'app/products/dto/product.dto';

import { IsString } from 'class-validator';
import { JeansTypeEntity } from '../entities/jeans-type.entity';

export class JeansTypeDto extends ProductDto {
  @IsString()
  hipGirth?: string;

  public static fromEntity(entity?: JeansTypeEntity) {
    if (!entity) {
      return;
    }

    const it: JeansTypeEntity = super.fromEntity(entity);
    it.hipGirth = entity.hipGirth;
    return it;
  }

  public static fromEntities(entities?: JeansTypeEntity[]) {
    if (!entities?.map) {
      return;
    }

    return entities.map((entity) => this.fromEntity(entity));
  }
}
