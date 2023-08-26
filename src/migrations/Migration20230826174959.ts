import { Migration } from '@mikro-orm/migrations';

export class Migration20230826174959 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "products" drop constraint if exists "products_category_check";');

    this.addSql('alter table "products" alter column "colors" type text[] using ("colors"::text[]);');
    this.addSql('alter table "products" alter column "sizes" type text[] using ("sizes"::text[]);');
    this.addSql('alter table "products" alter column "category" type text using ("category"::text);');
    this.addSql('alter table "products" add constraint "products_category_check" check ("category" in (\'Woman\', \'Man\', \'Children\'));');

    this.addSql('alter table "user_roles" alter column "permissions" type text[] using ("permissions"::text[]);');
  }

  async down(): Promise<void> {
    this.addSql('alter table "products" drop constraint if exists "products_category_check";');

    this.addSql('alter table "products" alter column "colors" type text[] using ("colors"::text[]);');
    this.addSql('alter table "products" alter column "sizes" type text[] using ("sizes"::text[]);');
    this.addSql('alter table "products" alter column "category" type text using ("category"::text);');
    this.addSql('alter table "products" add constraint "products_category_check" check ("category" in (\'Women\', \'Man\', \'Children\'));');

    this.addSql('alter table "user_roles" alter column "permissions" type text[] using ("permissions"::text[]);');
  }

}
