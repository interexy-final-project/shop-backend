import { Injectable } from '@nestjs/common';
import { SecurityService } from 'app/security/security.service';
import { UserRepo } from 'app/users/repo/user.repo';
import { UserSignInForm } from './dto/user-sign-in.form';
import { UserSignUpForm } from './dto/user-sign-up.form';
import { BadRequestException } from '@nestjs/common/exceptions';
import { UserRolesRepo } from 'app/user-roles/repo/user-roles.repo';
import { UserRoleDto } from 'app/user-roles/dto/user-role.dto';
import { UserRoles } from 'app/user-roles/enums/user-roles.enum';
import { I18nContext, I18nService } from 'nestjs-i18n';

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
    const { access_token, refresh_token } =
      await this.securityService.generateTokens(entity);

    await this.repo_users.updateRefreshTokenHash(entity.id, refresh_token);

    return await this.securityService.generateTokens(entity);
  }

  async signUp(form: UserSignUpForm) {
    const e_role = await this.repo_user_roles.getDefaultRole(UserRoles.CLIENT);
    console.log(e_role);

    const dto_role = UserRoleDto.fromEntity(e_role);
    const entity = await this.repo_users.addOneUser(form, dto_role);
    const { access_token, refresh_token } =
      await this.securityService.generateTokens(entity);

    await this.repo_users.updateRefreshTokenHash(entity.id, refresh_token);

    return { access_token, refresh_token };
  }
}
