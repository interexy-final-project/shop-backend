import { ProductEntity } from 'app/products/entities/product.entity';
import { IsString } from 'class-validator';
import { TShirtTypeEntity } from '../entities/t-shirt.entity';
import { ProductDto } from 'app/products/dto/product.dto';

export class TShirtTypeDto extends ProductDto {
  @IsString()
  waistGirth?: string;

  public static fromEntity(entity?: TShirtTypeEntity) {
    if (!entity) {
      return;
    }

    const it: TShirtTypeEntity = super.fromEntity(entity);
    it.waistGirth = entity.waistGirth;
    return it;
  }

  public static fromEntities(entities?: TShirtTypeEntity[]) {
    if (!entities?.map) {
      return;
    }

    return entities.map((entity) => this.fromEntity(entity));
  }
}
