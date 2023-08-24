import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ExtractJwt, Strategy } from "passport-jwt";
import * as passport from "passport";

import { UserSessionDto } from "./dtos/user-session.dto";

import { UserStatuses } from "app/users/enums/user-statuses.enum";
import { SecurityService } from "./security.service";
import { ErrorCodes } from "shared/enums/error-codes.enum";

@Injectable()
export class JwtStrategyService extends Strategy {
  readonly name = "jwt-strategy";

  constructor(
    private readonly configService: ConfigService,
    private readonly securityService: SecurityService
  ) {
    super(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        passReqToCallback: true,
        secretOrKey: configService.get("app.jwt_access_token_secret")
      },
      async (req, payload, next) => await this.verify(req, payload, next)
    );
    passport.use(this);
  }

  public async verify(req, payload: UserSessionDto, done) {
    const user = await this.securityService.getUserByEmail(payload.email);

    if (!user) {
      return done(ErrorCodes.NotExists_User, false);
    }

    if (user.status !== UserStatuses.ACTIVE) {
      return done("errors.invalid-status.user-not-active", false);
    }

    done(null, payload);
  }
}
