import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as passport from 'passport';

import { UserSessionDto } from './dtos/user-session.dto';

import { UserStatuses } from 'app/users/enums/user-statuses.enum';
import { SecurityService } from './security.service';
import { ErrorCodes } from 'shared/enums/error-codes.enum';

import { I18nService } from 'nestjs-i18n';


@Injectable()
export class JwtStrategyService extends Strategy {
  readonly name = 'jwt-strategy';

  constructor(
    private readonly configService: ConfigService,
    private readonly securityService: SecurityService,

    private readonly i18n: I18nService,

  ) {
    super(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        passReqToCallback: true,

        secretOrKey: configService.get('app.jwt_secret'),

      },
      async (req, payload, next) => await this.verify(req, payload, next),
    );
    // passport.use(this);
  }

  public async verify(req, payload: UserSessionDto, done) {
    const user = await this.securityService.getUserByEmail(payload.email);

    if (!user) {
      return done(this.i18n.t(ErrorCodes.NotExists_User), false);
    }

    if (user.status !== UserStatuses.ACTIVE) {

      return done(this.i18n.t(ErrorCodes.InvalidStatus_UserInactive), false);

    }

    done(null, payload);
  }
}
