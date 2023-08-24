import { Migration } from '@mikro-orm/migrations';

export class Migration20230824123643 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "types" drop constraint "types_category_id_foreign";');

    this.addSql('alter table "kinds" drop constraint "kinds_type_id_foreign";');

    this.addSql('alter table "products" drop constraint "products_kind_id_foreign";');

    this.addSql('drop table if exists "categories" cascade;');

    this.addSql('drop table if exists "types" cascade;');

    this.addSql('drop table if exists "kinds" cascade;');

    this.addSql('alter table "products" add column "category" text check ("category" in (\'Women\', \'Man\', \'Children\')) not null, add column "type" text check ("type" in (\'jeans_type_entity\', \'shirt_type_entity\', \'tshirt_type_entity\')) not null, add column "hip_girth" varchar(255) null, add column "sleeve_girth" varchar(255) null, add column "waist_girth" varchar(255) null;');
    this.addSql('alter table "products" drop column "kind_id";');
    this.addSql('create index "products_type_index" on "products" ("type");');
  }

  async down(): Promise<void> {
    this.addSql('create table "categories" ("id" bigserial primary key, "created" timestamptz(0) not null, "updated" timestamptz(0) not null, "name" text not null);');
    this.addSql('alter table "categories" add constraint "categories_name_unique" unique ("name");');

    this.addSql('create table "types" ("id" bigserial primary key, "created" timestamptz(0) not null, "updated" timestamptz(0) not null, "name" text not null, "category_id" bigint null);');
    this.addSql('alter table "types" add constraint "types_name_unique" unique ("name");');

    this.addSql('create table "kinds" ("id" bigserial primary key, "created" timestamptz(0) not null, "updated" timestamptz(0) not null, "name" text not null, "type_id" bigint null);');
    this.addSql('alter table "kinds" add constraint "kinds_name_unique" unique ("name");');

    this.addSql('alter table "types" add constraint "types_category_id_foreign" foreign key ("category_id") references "categories" ("id") on update cascade on delete set null;');

    this.addSql('alter table "kinds" add constraint "kinds_type_id_foreign" foreign key ("type_id") references "types" ("id") on update cascade on delete set null;');

    this.addSql('alter table "products" add column "kind_id" bigint null;');
    this.addSql('drop index "products_type_index";');
    this.addSql('alter table "products" add constraint "products_kind_id_foreign" foreign key ("kind_id") references "kinds" ("id") on update cascade on delete set null;');
    this.addSql('alter table "products" drop column "category";');
    this.addSql('alter table "products" drop column "type";');
    this.addSql('alter table "products" drop column "hip_girth";');
    this.addSql('alter table "products" drop column "sleeve_girth";');
    this.addSql('alter table "products" drop column "waist_girth";');
  }

}
