import {
  Body,
  Controller,
  Post,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { UserSignInForm } from './dto/user-sign-in.form';
import { UserSignUpForm } from './dto/user-sign-up.form';
import { ErrorCodes } from 'shared/enums/error-codes.enum';
import {
  CurrentUser,
  JwtPermissionsGuard,
  RestrictRequest,
} from 'app/security/guards/jwt-permissions.guard';
import { UserPermissions } from 'app/user-roles/enums/user-permissions.enum';
import { UserSessionDto } from 'app/security/dtos/user-session.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  async signIn(@Body() body: UserSignInForm) {
    const dto = UserSignInForm.from(body);
    const errors = await UserSignInForm.validate(dto);
    if (errors) {
      throw new BadRequestException({
        message: ErrorCodes.InvalidForm,
        errors,
      });
    }

    return await this.authService.signIn(dto);
  }

  @Post('sign-up')
  async signUp(@Body() body: UserSignUpForm) {
    const dto = UserSignUpForm.from(body);
    const errors = await UserSignUpForm.validate(dto);
    if (errors) {
      throw new BadRequestException({
        message: ErrorCodes.InvalidForm,
        errors,
      });
    }

    return await this.authService.signUp(dto);
  }

  @Post('access-token')
  async getAccessToken() {}

  @Post('sign-out')
  @UseGuards(JwtPermissionsGuard)
  @RestrictRequest(UserPermissions.SignOut)
  async signOut(@CurrentUser() user: UserSessionDto) {
    return null;
  }
}
