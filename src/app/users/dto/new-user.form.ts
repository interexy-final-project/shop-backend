import { IsEmail, IsString, validate } from 'class-validator';

import { ErrorCodes } from 'shared/enums/error-codes.enum';

export class NewUserForm {
  @IsEmail(undefined, { message: ErrorCodes.FieldShouldBeEmail })
  email!: string;

  @IsString({ message: ErrorCodes.FieldShouldBeString })
  password!: string;

  @IsString({ message: ErrorCodes.FieldShouldBeString })
  passwordConfirm!: string;

  static from(form: NewUserForm) {
    const it = new NewUserForm();
    it.email = form.email;
    it.password = form.password;
    it.passwordConfirm = form.passwordConfirm;
    return it;
  }

  static async validate(form: NewUserForm) {
    const errors = await validate(form);
    if (errors?.length) {
      return errors;
    }

    return null;
  }
}
