import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ abstract: true })
export abstract class IDEntity {
  @PrimaryKey({ type: 'bigserial', autoincrement: true })
  id!: number;

  @Property({ type: 'timestamptz' })
  created: Date = new Date();

  @Property({ type: 'timestamptz', onUpdate: () => new Date() })
  updated: Date = new Date();
}
