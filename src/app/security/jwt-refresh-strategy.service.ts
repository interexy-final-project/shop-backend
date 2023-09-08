import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as passport from 'passport';

import { UserSessionDto } from './dtos/user-session.dto';

import { UserStatuses } from 'app/users/enums/user-statuses.enum';
import { SecurityService } from './security.service';
import { ErrorCodes } from 'shared/enums/error-codes.enum';

import { Request } from 'express';
import { I18nService } from 'nestjs-i18n';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtRefreshStrategyService extends PassportStrategy(
  Strategy,
  'jwt-strategy-refresh',
) {
  readonly name = 'jwt-strategy-refresh';

  constructor(
    private readonly configService: ConfigService,
    private readonly securityService: SecurityService,
    private readonly i18n: I18nService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true,
      secretOrKey: configService.get('JWT_REFRESH_TOKEN_SECRET'),
    });
  }

  public async validate(req: Request, payload: any) {
    const refreshToken = req.get('authorization').replace('Bearer', '').trim();

    return {
      ...payload,
      refreshToken,
    };
  }
}
