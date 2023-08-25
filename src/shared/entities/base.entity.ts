import { Entity, Property } from '@mikro-orm/core';
import { UUIDEntity } from './uuid.entity';

@Entity({ abstract: true })
export abstract class BaseEntity extends UUIDEntity {
  @Property({ name: 'name', type: 'text', unique: true })
  name!: string;
}
