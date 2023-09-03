import { Migration } from '@mikro-orm/migrations';

export class Migration20230903102316 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "products" drop constraint if exists "products_type_check";');

    this.addSql('alter table "products" alter column "type" type text using ("type"::text);');
    this.addSql('alter table "products" add constraint "products_type_check" check ("type" in (\'Jeans-type\', \'Shirt-type\', \'T-shirt-type\'));');
    this.addSql('create index "products_type_index" on "products" ("type");');

    this.addSql('alter table "order_items" add column "size" text check ("size" in (\'XS\', \'S\', \'M\')) not null, add column "color" text check ("color" in (\'BLACK\', \'WHITE\', \'RED\', \'BLUE\')) not null;');

    this.addSql('alter table "cart_items" add column "size" text check ("size" in (\'XS\', \'S\', \'M\')) not null, add column "color" text check ("color" in (\'BLACK\', \'WHITE\', \'RED\', \'BLUE\')) not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "products" drop constraint if exists "products_type_check";');

    this.addSql('alter table "products" alter column "type" type smallint using ("type"::smallint);');
    this.addSql('drop index "products_type_index";');

    this.addSql('alter table "order_items" drop column "size";');
    this.addSql('alter table "order_items" drop column "color";');

    this.addSql('alter table "cart_items" drop column "size";');
    this.addSql('alter table "cart_items" drop column "color";');
  }

}
