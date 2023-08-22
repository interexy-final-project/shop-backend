import { Migration } from '@mikro-orm/migrations';

export class Migration20230822153537 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "orders" add column "address" jsonb not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "orders" drop column "address";');
  }

}
