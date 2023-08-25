import { Entity, Property } from '@mikro-orm/core';
import { IDEntity } from 'shared/entities/id.entity';
import { UUIDEntity } from './uuid.entity';

@Entity({ abstract: true })
export abstract class BaseEntity extends UUIDEntity {
  @Property({ name: 'name', type: 'text', unique: true })
  name!: string;
}
