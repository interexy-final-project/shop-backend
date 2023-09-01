import { Entity, Enum, Property } from '@mikro-orm/core';

import { JeansTypeRepo } from '../repo/jeans-type.repo';
import { ProductEntity } from 'app/products/entities/product.entity';
import { ProductTypes } from 'app/products/enums/product-types.enum';

@Entity({
  customRepository: () => JeansTypeRepo,
  discriminatorValue: ProductTypes.JEANS,
})
export class JeansTypeEntity extends ProductEntity {
  @Property({ name: 'hip_girth' })
  hipGirth!: string;

  @Enum({
    name: 'type',
  })
  type?: ProductTypes.JEANS;
}
