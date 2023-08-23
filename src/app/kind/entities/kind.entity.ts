import { Entity, ManyToOne, OneToMany, Property } from '@mikro-orm/core';
import { BaseEntity } from 'shared/entities/base.entity';
import { KindRepo } from 'app/product/repo/kind.repo';
import { UserEntity } from 'app/users/entities/user.entity';
import { TypeEntity } from 'app/type/entities/type.entity';
import { ProductEntity } from 'app/product/entities/product.entity';

@Entity({ tableName: 'kinds', customRepository: () => KindRepo })
export class KindEntity extends BaseEntity {
  @Property({ name: 'type_id' })
  typeId!: number;

  @ManyToOne({
    entity: () => TypeEntity,
    inversedBy: (e) => e.kinds,
    joinColumn: 'type_id',
    referenceColumnName: 'id',
    nullable: true,
    lazy: true,
  })
  type?: TypeEntity;

  @OneToMany(() => ProductEntity, (e) => e.kind)
  products?: ProductEntity[];
}
