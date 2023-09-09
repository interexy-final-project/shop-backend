import { Entity, Enum, Property } from '@mikro-orm/core';

import { ShirtTypeRepo } from '../repo/shirt-type.repo';
import { ProductEntity } from 'app/products/entities/product.entity';
import { ProductTypes } from 'app/products/enums/product-types.enum';

@Entity({
  customRepository: () => ShirtTypeRepo,
  discriminatorValue: ProductTypes.SHIRT,
})
export class ShirtTypeEntity extends ProductEntity {
  @Property({ name: 'sleeve_length' })
  sleeveLength?: string;
}
