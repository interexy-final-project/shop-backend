import {
  Body,
  Get,
  Controller,
  Post,
  BadRequestException,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
  Param,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { UserSignInForm } from './dto/user-sign-in.form';
import { UserSignUpForm } from './dto/user-sign-up.form';
import { I18n, I18nContext } from 'nestjs-i18n';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UserResetPasswordForm } from './dto/user-reset-password.form';
import { UserChangePasswordForm } from './dto/user-change-password.form';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @HttpCode(HttpStatus.OK)
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

  @HttpCode(HttpStatus.CREATED)
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

  @UseGuards(AuthGuard('jwt-strategy'))
  @HttpCode(HttpStatus.OK)
  @Post('log-out')
  async logOut(@Req() req: Request) {
    const user = req.user;

    return await this.authService.logOut(user['id']);
  }

  @UseGuards(AuthGuard('jwt-strategy-refresh'))
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async getAccessToken(@Req() req: Request) {
    const user = req.user;

    return await this.authService.refresh(user['id'], user['refreshToken']);
  }

  @Post('change-password/:token')
  async changePassword(
    @Param('token') token,
    @Body() body: UserChangePasswordForm,
  ) {
    const dto = UserChangePasswordForm.from(body);
    await this.authService.changePassword(token, dto.password);
  }

  @Post('reset-password')
  async resetPassword(@Body() body: UserResetPasswordForm) {
    const dto = UserResetPasswordForm.from(body);

    return await this.authService.resetPassword(dto.email);
  }
}
