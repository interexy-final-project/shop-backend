import { Migration } from '@mikro-orm/migrations';

export class Migration20230828092439 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "order_items" drop column "status";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "order_items" add column "status" text check ("status" in (\'Active\', \'Archived\')) not null;');
  }

}
