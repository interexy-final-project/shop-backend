import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SecurityService } from './security.service';

import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserEntity } from 'app/users/entities/user.entity';
import { UserRepo } from 'app/users/repo/user.repo';
import { JwtStrategyService } from './jwt-strategy.service';
import { JwtRefreshStrategyService } from './jwt-refresh-strategy.service';
// import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    // PassportModule.register({defaultStrategy: "jwt-strategy"}),
    JwtModule.register({}),
    MikroOrmModule.forFeature({
      entities: [UserEntity],
    }),
  ],

  providers: [SecurityService, UserRepo, JwtStrategyService, JwtRefreshStrategyService],

  exports: [SecurityService],
})
export class SecurityModule {}
