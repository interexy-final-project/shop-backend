import { Entity, Property } from '@mikro-orm/core';
import { TShirtTypeRepo } from '../repo/t-shirt-type.repo';
import { ProductEntity } from 'app/products/entities/product.entity';
import { ProductTypes } from 'app/products/enums/product-types.enum';

@Entity({
  customRepository: () => TShirtTypeRepo,
  discriminatorValue: ProductTypes.TSHIRT,
})
export class TShirtTypeEntity extends ProductEntity {
  @Property({ name: 'waist_girth' })
  waistGirth?: string;
}
