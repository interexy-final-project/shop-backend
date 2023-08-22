import { Migration } from '@mikro-orm/migrations';

export class Migration20230822152443 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "orders" add column "payment_method" text check ("payment_method" in (\'Card\', \'Cash\', \'Kidney\')) not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "orders" drop column "payment_method";');
  }

}
