import { Body, Controller, Post, BadRequestException } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UserSignInForm } from './dto/user-sign-in.form';
import { UserSignUpForm } from './dto/user-sign-up.form';
import { I18n, I18nContext } from 'nestjs-i18n';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  async signIn(@Body() body: UserSignInForm, @I18n() i18n: I18nContext) {
    const dto = UserSignInForm.from(body);
    const errors = await UserSignInForm.validate(dto);
    if (errors) {
      throw new BadRequestException({
        message: i18n.t('test.invalidForm'),
        errors,
      });
    }

    return await this.authService.signIn(dto);
  }

  @Post('sign-up')
  async signUp(@Body() body: UserSignUpForm, @I18n() i18n: I18nContext) {
    const dto = UserSignUpForm.from(body);
    const errors = await UserSignUpForm.validate(dto);
    if (errors) {
      throw new BadRequestException({
        message: i18n.t('test.invalidForm'),
        errors,
      });
    }

    return await this.authService.signUp(dto);
  }

  @Post('access-token')
  async getAccessToken() {}
}
