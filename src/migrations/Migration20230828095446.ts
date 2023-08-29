import { Migration } from '@mikro-orm/migrations';

export class Migration20230828095446 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "products" alter column "name" type varchar(255) using ("name"::varchar(255));');
  }

  async down(): Promise<void> {
    this.addSql('alter table "products" alter column "name" type text using ("name"::text);');
  }

}
