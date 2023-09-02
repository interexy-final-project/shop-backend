import { Entity, Property } from '@mikro-orm/core';

@Entity({
  expression: `
  SELECT DISTINCT color
  FROM products, unnest(colors) AS color
  `,
})
export class Colors {
  @Property()
  color: string;
}
