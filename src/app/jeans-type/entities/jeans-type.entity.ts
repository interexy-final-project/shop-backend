import { Entity, Property } from '@mikro-orm/core';

import { JeansTypeRepo } from '../repo/jeans-type.repo';
import { ProductEntity } from 'app/product/entities/product.entity';

@Entity({ tableName: 'jeans_type', customRepository: () => JeansTypeRepo })
export class JeansTypeEntity extends ProductEntity {
  @Property({ name: 'hip_girth' })
  hip_girth?: string;
}
