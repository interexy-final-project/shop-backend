import { Migration } from '@mikro-orm/migrations';

export class Migration20230817163953 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "orders" drop constraint "orders_pkey";');
    this.addSql('alter table "orders" add constraint "orders_pkey" primary key ("id");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "orders" drop constraint "orders_pkey";');
    this.addSql('alter table "orders" add constraint "orders_pkey" primary key ("id", "user_id");');
  }

}
