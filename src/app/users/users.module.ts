import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserEntity } from './entities/user.entity';
import { SecurityModule } from 'app/security/security.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserRepo } from './repo/user.repo';

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [UserEntity],
    }),
    SecurityModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepo],
})
export class UsersModule {}
