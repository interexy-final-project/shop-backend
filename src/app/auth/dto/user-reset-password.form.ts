import { IsEmail, IsString, validate } from 'class-validator';

import { ErrorCodes } from 'shared/enums/error-codes.enum';

export class UserResetPasswordForm {
  @IsEmail()
  @IsString({ message: ErrorCodes.FieldShouldBeString })
  email!: string;

  static from(form: UserResetPasswordForm) {
    const it = new UserResetPasswordForm();
    it.email = String(form.email);

    return it;
  }

  static async validate(form: UserResetPasswordForm) {
    const errors = await validate(form);
    if (errors?.length) {
      return errors;
    }

    return null;
  }
}
