import { Entity, Property } from '@mikro-orm/core';
import { TShirtTypeRepo } from '../repo/t-shirt-type.repo';
import { ProductEntity } from 'app/products/entities/product.entity';

@Entity({ tableName: 't-shirt_type', customRepository: () => TShirtTypeRepo })
export class TShirtTypeEntity extends ProductEntity {
  @Property({ name: 'waist_girth' })
  waist_girth?: string;
}
