import { IsString, validate } from 'class-validator';
import { MatchesProperty } from '../utils/match.validator';

import { ErrorCodes } from 'shared/enums/error-codes.enum';

export class UserChangePasswordForm {
  @IsString({ message: ErrorCodes.FieldShouldBeString })
  password!: string;

  @MatchesProperty('password')
  @IsString({ message: ErrorCodes.FieldShouldBeString })
  passwordConfirm!: string;

  static from(form: UserChangePasswordForm) {
    const it = new UserChangePasswordForm();
    it.password = String(form.password);

    return it;
  }

  static async validate(form: UserChangePasswordForm) {
    const errors = await validate(form);
    if (errors?.length) {
      return errors;
    }

    return null;
  }
}
