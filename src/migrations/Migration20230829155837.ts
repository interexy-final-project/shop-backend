import { Migration } from '@mikro-orm/migrations';

export class Migration20230829155837 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "products" drop constraint if exists "products_type_check";');

    this.addSql('alter table "products" alter column "type" type text using ("type"::text);');
    this.addSql('alter table "products" add constraint "products_type_check" check ("type" in (\'Jeans-type\', \'T-shirt-type\', \'Shirt-type\'));');
    this.addSql('create index "products_type_index" on "products" ("type");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "products" drop constraint if exists "products_type_check";');

    this.addSql('alter table "products" alter column "type" type smallint using ("type"::smallint);');
    this.addSql('drop index "products_type_index";');
  }

}