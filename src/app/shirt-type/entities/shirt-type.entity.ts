import { Entity, Property } from '@mikro-orm/core';

import { ShirtTypeRepo } from '../repo/shirt-type.repo';
import { ProductEntity } from 'app/products/entities/product.entity';

@Entity({ tableName: 'shirt_type', customRepository: () => ShirtTypeRepo })
export class ShirtTypeEntity extends ProductEntity {
  @Property({ name: 'sleeve_girth' })
  sleeve_girth?: string;
}
