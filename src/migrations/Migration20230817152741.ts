import { Migration } from '@mikro-orm/migrations';

export class Migration20230817152741 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "shipping_addresses" ("id" uuid not null, "created" timestamptz(0) not null, "updated" timestamptz(0) not null, "address" text not null, "city" text not null, "phone" varchar(255) not null, "user_id" uuid null, constraint "shipping_addresses_pkey" primary key ("id"));');

    this.addSql('alter table "shipping_addresses" add constraint "shipping_addresses_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade on delete set null;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "shipping_addresses" cascade;');
  }

}
