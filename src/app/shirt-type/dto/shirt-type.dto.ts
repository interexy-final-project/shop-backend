import { ProductDto } from 'app/products/dto/product.dto';
import { IsString } from 'class-validator';
import { ShirtTypeEntity } from '../entities/shirt-type.entity';

export class ShirtTypeDto extends ProductDto {
  @IsString()
  sleeveLength?: string;

  public static fromEntity(entity?: ShirtTypeEntity) {
    if (!entity) {
      return;
    }

    const instance: ShirtTypeEntity = super.fromEntity(entity);
    instance.sleeve_Length = entity.sleeve_Length;
    return instance;
  }

  public static fromEntities(entities?: ShirtTypeEntity[]) {
    if (!entities?.map) {
      return;
    }

    return entities.map((entity) => this.fromEntity(entity));
  }
}
