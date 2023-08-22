import { Migration } from '@mikro-orm/migrations';

export class Migration20230817150621 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user_roles" ("id" bigserial primary key, "created" timestamptz(0) not null, "updated" timestamptz(0) not null, "type" text not null, "is_default" boolean not null, "permissions" text[] not null);');
    this.addSql('alter table "user_roles" add constraint "user_roles_type_unique" unique ("type");');

    this.addSql('create table "users" ("id" uuid not null, "created" timestamptz(0) not null, "updated" timestamptz(0) not null, "first_name" varchar(255) not null, "second_name" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "status" text check ("status" in (\'Active\', \'INACTIVE\')) not null default \'Active\', "role_id" bigint null, constraint "users_pkey" primary key ("id"));');
    this.addSql('alter table "users" add constraint "users_email_unique" unique ("email");');

    this.addSql('alter table "users" add constraint "users_role_id_foreign" foreign key ("role_id") references "user_roles" ("id") on update cascade on delete set null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "users" drop constraint "users_role_id_foreign";');

    this.addSql('drop table if exists "user_roles" cascade;');

    this.addSql('drop table if exists "users" cascade;');
  }

}
