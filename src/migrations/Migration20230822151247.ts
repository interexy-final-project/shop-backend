import { Migration } from '@mikro-orm/migrations';

export class Migration20230822151247 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "cart_items" drop constraint "cart_items_product_id_foreign";');

    this.addSql('alter table "products" add column "amount" int not null;');

    this.addSql('alter table "cart_items" alter column "product_id" type bigint using ("product_id"::bigint);');
    this.addSql('alter table "cart_items" alter column "product_id" set not null;');
    this.addSql('alter table "cart_items" add constraint "cart_items_product_id_foreign" foreign key ("product_id") references "products" ("id") on update cascade;');
    this.addSql('alter table "cart_items" add constraint "cart_items_product_id_unique" unique ("product_id");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "cart_items" drop constraint "cart_items_product_id_foreign";');

    this.addSql('alter table "products" drop column "amount";');

    this.addSql('alter table "cart_items" alter column "product_id" type bigint using ("product_id"::bigint);');
    this.addSql('alter table "cart_items" alter column "product_id" drop not null;');
    this.addSql('alter table "cart_items" drop constraint "cart_items_product_id_unique";');
    this.addSql('alter table "cart_items" add constraint "cart_items_product_id_foreign" foreign key ("product_id") references "products" ("id") on update cascade on delete set null;');
  }

}
