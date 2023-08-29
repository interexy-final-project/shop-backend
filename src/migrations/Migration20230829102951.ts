import { Migration } from '@mikro-orm/migrations';

export class Migration20230829102951 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "products" drop constraint if exists "products_type_check";');
    this.addSql('alter table "products" drop constraint if exists "products_category_check";');

    this.addSql('alter table "products" alter column "name" type text using ("name"::text);');
    this.addSql('alter table "products" alter column "colors" type text[] using ("colors"::text[]);');
    this.addSql('alter table "products" alter column "type" type text using ("type"::text);');
    this.addSql('alter table "products" add constraint "products_type_check" check ("type" in (\'Jeans-type\', \'T-shirt-type\', \'Shirt-type\'));');
    this.addSql('alter table "products" alter column "type" drop not null;');
    this.addSql('alter table "products" alter column "category" type text using ("category"::text);');
    this.addSql('alter table "products" add constraint "products_category_check" check ("category" in (\'Woman\', \'Men\', \'Children\'));');
  }

  async down(): Promise<void> {
    this.addSql('alter table "products" drop constraint if exists "products_category_check";');
    this.addSql('alter table "products" drop constraint if exists "products_type_check";');

    this.addSql('alter table "products" alter column "name" type varchar(255) using ("name"::varchar(255));');
    this.addSql('alter table "products" alter column "colors" type text[] using ("colors"::text[]);');
    this.addSql('alter table "products" alter column "category" type text using ("category"::text);');
    this.addSql('alter table "products" add constraint "products_category_check" check ("category" in (\'Woman\', \'Man\', \'Children\'));');
    this.addSql('alter table "products" alter column "type" type text using ("type"::text);');
    this.addSql('alter table "products" add constraint "products_type_check" check ("type" in (\'Jeans-type\', \'Shirt-type\', \'T-shirt-type\'));');
    this.addSql('alter table "products" alter column "type" set not null;');
  }

}
