import {Entity, OneToMany} from '@mikro-orm/core';
import {BaseEntity} from "app/product/entities/base.entity";
import {CategoryRepo} from "app/product/repo/category.repo";
import {TypeEntity} from "app/product/entities/type.entity";

@Entity({ tableName: 'categories', customRepository: () => CategoryRepo })
export class CategoryEntity extends BaseEntity {
  @OneToMany(() => TypeEntity, e => e.category)
  types?: TypeEntity[];
}
