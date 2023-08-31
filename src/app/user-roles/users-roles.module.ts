import { Module } from "@nestjs/common";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { UserRoleEntity } from "./entities/user-role.entity";
import { UserRolesService } from "./users-roles.service";
import { UserRolesController } from "./users-roles.controller";


@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [
        UserRoleEntity
      ]
    }),
  ],
  providers: [UserRolesService],
  controllers: [UserRolesController]
})
export class UserRolesModule {
}
