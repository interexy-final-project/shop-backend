import { Entity, Property } from "@mikro-orm/core";
import {IDEntity} from "shared/entities/id.entity";

@Entity({ abstract: true })
export abstract class BaseEntity extends IDEntity {
  @Property({ name: 'name', type: "text", unique: true })
  name!: string;
}