import { Migration } from '@mikro-orm/migrations';

export class Migration20230828091030 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "products" ("id" uuid not null, "created" timestamptz(0) not null, "updated" timestamptz(0) not null, "name" text not null, "price" int not null, "images" text[] not null, "colors" text[] not null, "sizes" text[] not null, "status" text check ("status" in (\'Active\', \'Archived\')) not null default \'Active\', "description" text not null, "amount" int not null, "type" text check ("type" in (\'Jeans-type\', \'Shirt-type\', \'T-shirt-type\')) not null, "category" text check ("category" in (\'Woman\', \'Man\', \'Children\')) not null, "hip_girth" varchar(255) null, "waist_girth" varchar(255) null, "sleeve_girth" varchar(255) null, constraint "products_pkey" primary key ("id"));');
    this.addSql('alter table "products" add constraint "products_name_unique" unique ("name");');
    this.addSql('create index "products_type_index" on "products" ("type");');

    this.addSql('create table "user_roles" ("id" uuid not null, "created" timestamptz(0) not null, "updated" timestamptz(0) not null, "type" text not null, "is_default" boolean not null, "permissions" text[] not null, constraint "user_roles_pkey" primary key ("id"));');
    this.addSql('alter table "user_roles" add constraint "user_roles_type_unique" unique ("type");');

    this.addSql('create table "users" ("id" uuid not null, "created" timestamptz(0) not null, "updated" timestamptz(0) not null, "first_name" varchar(255) null, "second_name" varchar(255) null, "email" varchar(255) not null, "password" varchar(255) not null, "rt_hash" varchar(255) null, "status" text check ("status" in (\'Active\', \'Inactive\')) not null default \'Active\', "role_id" uuid null, constraint "users_pkey" primary key ("id"));');
    this.addSql('alter table "users" add constraint "users_email_unique" unique ("email");');
    this.addSql('alter table "users" add constraint "ix_user_email" unique ("email");');

    this.addSql('create table "shipping_addresses" ("id" uuid not null, "created" timestamptz(0) not null, "updated" timestamptz(0) not null, "address" text not null, "city" text not null, "phone" varchar(255) not null, "user_id" uuid null, constraint "shipping_addresses_pkey" primary key ("id"));');

    this.addSql('create table "orders" ("id" uuid not null, "created" timestamptz(0) not null, "updated" timestamptz(0) not null, "user_id" uuid null, "total" int not null, "status" text check ("status" in (\'Created\')) not null, "address" jsonb not null, "payment_method" text check ("payment_method" in (\'Card\', \'Cash\', \'Kidney\')) not null, constraint "orders_pkey" primary key ("id"));');

    this.addSql('create table "order_items" ("id" bigserial primary key, "created" timestamptz(0) not null, "updated" timestamptz(0) not null, "order_id" uuid null, "product" jsonb not null, "quantity" int not null, "status" text check ("status" in (\'Created\')) not null);');

    this.addSql('create table "cart_items" ("id" uuid not null, "created" timestamptz(0) not null, "updated" timestamptz(0) not null, "order_id" varchar(255) not null, "product_id" uuid not null, "quantity" int not null, "user_id" uuid null, constraint "cart_items_pkey" primary key ("id"));');
    this.addSql('alter table "cart_items" add constraint "cart_items_product_id_unique" unique ("product_id");');

    this.addSql('alter table "users" add constraint "users_role_id_foreign" foreign key ("role_id") references "user_roles" ("id") on update cascade on delete set null;');

    this.addSql('alter table "shipping_addresses" add constraint "shipping_addresses_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade on delete set null;');

    this.addSql('alter table "orders" add constraint "orders_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade on delete set null;');

    this.addSql('alter table "order_items" add constraint "order_items_order_id_foreign" foreign key ("order_id") references "orders" ("id") on update cascade on delete set null;');

    this.addSql('alter table "cart_items" add constraint "cart_items_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade on delete set null;');
    this.addSql('alter table "cart_items" add constraint "cart_items_product_id_foreign" foreign key ("product_id") references "products" ("id") on update cascade;');
  }

}
