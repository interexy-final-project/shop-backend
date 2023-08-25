import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  SetMetadata,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';
import { UserPermissions } from 'app/user-roles/enums/user-permissions.enum';
import { UserSessionDto } from '../dtos/user-session.dto';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { I18nService } from 'nestjs-i18n';
import { ErrorCodes } from 'shared/enums/error-codes.enum';

import { difference, isEmpty, includes } from 'lodash';

export const RestrictRequest = (...scopes: UserPermissions[]) =>
  SetMetadata('user_permissions', scopes);

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    return request.user as UserSessionDto;
  },
);

@Injectable()
export class JwtPermissionGuard
  extends AuthGuard('jwt-strategy')
  implements CanActivate
{
  protected readonly logger = new Logger('User Permissions Guard');

  protected permissions: UserPermissions[];

  constructor(
    private readonly reflector: Reflector,
    private readonly i18n: I18nService,
  ) {
    super();
  }

  canActivate(context: ExecutionContext) {
    this.permissions =
      this.reflector.get<UserPermissions[]>(
        'user_permissions',
        context.getHandler(),
      ) || [];

    return super.canActivate(context);
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  handleRequest(error: Error, user: UserSessionDto) {
    if (error || !user) {
      this.logger.error('User is not authorized to perform request');

      throw (
        error ||
        new UnauthorizedException(this.i18n.t(ErrorCodes.NotAuthorizedRequest))
      );
    }

    if (isEmpty(this.permissions)) {
      return user;
    }

    if (includes(user.permissions, UserPermissions.ALL)) {
      return user;
    }

    if (difference(this.permissions, user.permissions).length) {
      this.logger.error('User is not authorized to perform request');

      throw new UnauthorizedException(
        this.i18n.t(ErrorCodes.NotAuthorizedRequest),
      );
    }
    return user;
  }
}
