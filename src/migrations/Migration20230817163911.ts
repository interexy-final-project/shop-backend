import { Migration } from '@mikro-orm/migrations';

export class Migration20230817163911 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "categories" ("id" bigserial primary key, "created" timestamptz(0) not null, "updated" timestamptz(0) not null, "name" text not null);');
    this.addSql('alter table "categories" add constraint "categories_name_unique" unique ("name");');

    this.addSql('create table "types" ("id" bigserial primary key, "created" timestamptz(0) not null, "updated" timestamptz(0) not null, "name" text not null, "category_id" bigint null);');
    this.addSql('alter table "types" add constraint "types_name_unique" unique ("name");');

    this.addSql('create table "kinds" ("id" bigserial primary key, "created" timestamptz(0) not null, "updated" timestamptz(0) not null, "name" text not null, "type_id" bigint null);');
    this.addSql('alter table "kinds" add constraint "kinds_name_unique" unique ("name");');

    this.addSql('create table "products" ("id" bigserial primary key, "created" timestamptz(0) not null, "updated" timestamptz(0) not null, "name" text not null, "price" int not null, "images" text[] not null, "colors" text[] not null, "sizes" text[] not null, "status" text check ("status" in (\'Active\', \'Archived\')) not null default \'Active\', "description" text not null, "kind_id" bigint null);');
    this.addSql('alter table "products" add constraint "products_name_unique" unique ("name");');

    this.addSql('create table "orders" ("id" uuid not null, "user_id" uuid null, "created" timestamptz(0) not null, "updated" timestamptz(0) not null, "total" int not null, "status" text check ("status" in (\'Created\')) not null, constraint "orders_pkey" primary key ("id", "user_id"));');

    this.addSql('create table "order_items" ("id" bigserial primary key, "created" timestamptz(0) not null, "updated" timestamptz(0) not null, "order_id" uuid null, "product" jsonb not null, "quantity" int not null, "status" text check ("status" in (\'Created\')) not null);');

    this.addSql('create table "cart_items" ("id" bigserial primary key, "created" timestamptz(0) not null, "updated" timestamptz(0) not null, "order_id" varchar(255) not null, "product_id" bigint null, "quantity" int not null, "user_id" uuid null);');

    this.addSql('alter table "types" add constraint "types_category_id_foreign" foreign key ("category_id") references "categories" ("id") on update cascade on delete set null;');

    this.addSql('alter table "kinds" add constraint "kinds_type_id_foreign" foreign key ("type_id") references "types" ("id") on update cascade on delete set null;');

    this.addSql('alter table "products" add constraint "products_kind_id_foreign" foreign key ("kind_id") references "kinds" ("id") on update cascade on delete set null;');

    this.addSql('alter table "orders" add constraint "orders_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade on delete set null;');

    this.addSql('alter table "order_items" add constraint "order_items_order_id_foreign" foreign key ("order_id") references "orders" ("id") on update cascade on delete set null;');

    this.addSql('alter table "cart_items" add constraint "cart_items_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade on delete set null;');
    this.addSql('alter table "cart_items" add constraint "cart_items_product_id_foreign" foreign key ("product_id") references "products" ("id") on update cascade on delete set null;');

    this.addSql('alter table "users" drop constraint if exists "users_status_check";');

    this.addSql('alter table "users" alter column "status" type text using ("status"::text);');
    this.addSql('alter table "users" add constraint "users_status_check" check ("status" in (\'Active\', \'Inactive\'));');
  }

  async down(): Promise<void> {
    this.addSql('alter table "types" drop constraint "types_category_id_foreign";');

    this.addSql('alter table "kinds" drop constraint "kinds_type_id_foreign";');

    this.addSql('alter table "products" drop constraint "products_kind_id_foreign";');

    this.addSql('alter table "cart_items" drop constraint "cart_items_product_id_foreign";');

    this.addSql('alter table "order_items" drop constraint "order_items_order_id_foreign";');

    this.addSql('drop table if exists "categories" cascade;');

    this.addSql('drop table if exists "types" cascade;');

    this.addSql('drop table if exists "kinds" cascade;');

    this.addSql('drop table if exists "products" cascade;');

    this.addSql('drop table if exists "orders" cascade;');

    this.addSql('drop table if exists "order_items" cascade;');

    this.addSql('drop table if exists "cart_items" cascade;');

    this.addSql('alter table "users" drop constraint if exists "users_status_check";');

    this.addSql('alter table "users" alter column "status" type text using ("status"::text);');
    this.addSql('alter table "users" add constraint "users_status_check" check ("status" in (\'Active\', \'INACTIVE\'));');
  }

}
