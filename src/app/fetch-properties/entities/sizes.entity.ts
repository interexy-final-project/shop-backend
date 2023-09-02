import { Entity, Property } from '@mikro-orm/core';

@Entity({
  expression: `
  SELECT DISTINCT size
  FROM products, unnest(sizes) AS size
  `,
})
export class Sizes {
  @Property()
  size: string;
}
