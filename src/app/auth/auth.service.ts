import { Injectable } from '@nestjs/common';
import { SecurityService } from 'app/security/security.service';
import { UserRepo } from 'app/users/repo/user.repo';
import { UserSignInForm } from './dto/user-sign-in.form';
import { UserSignUpForm } from './dto/user-sign-up.form';
import {
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common/exceptions';
import { UserRolesRepo } from 'app/user-roles/repo/user-roles.repo';
import { UserRoleDto } from 'app/user-roles/dto/user-role.dto';
import { UserRoles } from 'app/user-roles/enums/user-roles.enum';
import * as bcrypt from 'bcrypt';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { ErrorCodes } from 'shared/enums/error-codes.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly repo_users: UserRepo,
    private readonly securityService: SecurityService,
    private readonly repo_user_roles: UserRolesRepo,
    private readonly i18n: I18nService,
  ) {}

  async validateUserById(id: string) {
    return await this.repo_users.getById(id);
  }

  async signIn(form: UserSignInForm): Promise<any> {
    const entity = await this.repo_users.getByEmail(form.email);
    if (!entity) {
      throw new BadRequestException({
        message: this.i18n.t('test.notExistsUser', {
          lang: I18nContext.current().lang,
        }),
      });
    }
    const { id } = entity;

    const passwordMatches = await bcrypt.compare(
      form.password,
      entity.password,
    );

    if (!passwordMatches) {
      throw new BadRequestException({ message: ErrorCodes.Wrong_Password });
    }
    const { access_token, refresh_token } =
      await this.securityService.generateTokens(entity);

    await this.repo_users.updateRefreshTokenHash(entity.id, refresh_token);

    return { access_token, refresh_token, id };
  }

  async signUp(user_dto: UserSignUpForm) {
    const e_role = await this.repo_user_roles.getDefaultRole(UserRoles.CLIENT);
    const dto_role = UserRoleDto.fromEntity(e_role);
    const entity = await this.repo_users.addOneUser(user_dto, dto_role);
    const { id } = entity;
    const { access_token, refresh_token } =
      await this.securityService.generateTokens(entity);

    await this.repo_users.updateRefreshTokenHash(entity.id, refresh_token);

    return { access_token, refresh_token, id };
  }

  async logOut(id: string) {
    return await this.repo_users.logOut(id);
  }

  async refresh(id: string, rt: string) {
    const user = await this.repo_users.getById(id);

    const rtMatches = bcrypt.compare(rt, user.rtHash);

    if (!rtMatches) throw new ForbiddenException('Access Denied!');

    const { access_token, refresh_token } =
      await this.securityService.generateTokens(user);

    await this.repo_users.updateRefreshTokenHash(user.id, refresh_token);

    return { access_token, refresh_token };
  }

  async changePassword(resetToken: string, password: string) {
    const user = await this.repo_users.getByToken(resetToken);

    if (!user) throw new ForbiddenException('Access Denied!');

    this.repo_users.changePassword(user.id, password);

    const { access_token, refresh_token } =
      await this.securityService.generateTokens(user);

    await this.repo_users.updateRefreshTokenHash(user.id, refresh_token);

    return { access_token, refresh_token };
  }

  async resetPassword(email: string) {
    const user = await this.repo_users.getByEmail(email);

    if (!user) throw new ForbiddenException('No such user!');

    const resetToken = await this.securityService.generateResetToken(email);

    await this.repo_users.setResetToken(user.id, resetToken);

    return resetToken;
  }
}
