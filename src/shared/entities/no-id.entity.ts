import { Entity, Property } from '@mikro-orm/core';

@Entity({ abstract: true })
export abstract class NoIdEntity {
  @Property({ type: 'timestamptz' })
  created: Date = new Date();

  @Property({ type: 'timestamptz', onUpdate: () => new Date() })
  updated: Date = new Date();
}
