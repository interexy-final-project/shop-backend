import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserEntity } from 'app/users/entities/user.entity';
import { SecurityModule } from 'app/security/security.module';
import { UserRepo } from 'app/users/repo/user.repo';
import { MikroOrmModule } from '@mikro-orm/nestjs/mikro-orm.module';
import { UserRolesRepo } from 'app/user-roles/repo/user-roles.repo';

import { JwtPermissionsGuard } from 'app/security/guards/jwt-permissions.guard';


@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [UserEntity],
    }),
    SecurityModule,
  ],

  providers: [AuthService, UserRepo, UserRolesRepo, JwtPermissionsGuard],

  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
