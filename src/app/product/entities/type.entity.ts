import {Entity, ManyToOne, OneToMany, Property} from '@mikro-orm/core';
import {BaseEntity} from "app/product/entities/base.entity";
import {TypeRepo} from "app/product/repo/type.repo";
import {KindEntity} from "app/product/entities/kind.entity";
import {CategoryEntity} from "app/product/entities/category.entity";

@Entity({ tableName: 'types', customRepository: () => TypeRepo })
export class TypeEntity extends BaseEntity {
  @Property({ name: 'category_id' })
  categoryId!: number;

  @ManyToOne({
    entity: () => CategoryEntity,
    inversedBy: e => e.types,
    joinColumn: "category_id",
    referenceColumnName: "id",
    nullable: true,
    lazy: true,
  })
  category?: CategoryEntity;

  @OneToMany(() => KindEntity, e => e.type)
  kinds?: KindEntity[];
}
