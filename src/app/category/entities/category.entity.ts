import { Entity, OneToMany } from '@mikro-orm/core';
import { BaseEntity } from 'shared/entities/base.entity';
import { CategoryRepo } from 'app/product/repo/category.repo';
import { TypeEntity } from 'app/type/entities/type.entity';

@Entity({ tableName: 'categories', customRepository: () => CategoryRepo })
export class CategoryEntity extends BaseEntity {
  @OneToMany(() => TypeEntity, (e) => e.category)
  types?: TypeEntity[];
}
