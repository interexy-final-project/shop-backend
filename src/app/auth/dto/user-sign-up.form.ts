import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  validate,
} from 'class-validator';
import { MatchesProperty } from '../utils/match.validator';

import { ErrorCodes } from 'shared/enums/error-codes.enum';

export class UserSignUpForm {
  @IsEmail(undefined, { message: ErrorCodes.FieldShouldBeEmail })
  email!: string;

  @IsString({ message: ErrorCodes.FieldShouldBeString })
  password!: string;

  @MatchesProperty('password')
  @IsString({ message: ErrorCodes.FieldShouldBeString })
  passwordConfirm!: string;

  @IsString({ message: ErrorCodes.FieldShouldBeString })
  firstName!: string;

  @IsString({ message: ErrorCodes.FieldShouldBeString })
  lastName!: string;

  @IsPhoneNumber('BY', { message: ErrorCodes.CartItemExists })
  @IsString({ message: ErrorCodes.FieldShouldBeString })
  phone!: string;

  static from(form: UserSignUpForm) {
    const it = new UserSignUpForm();
    it.email = String(form.email);
    it.password = String(form.password);
    it.firstName = String(form.firstName);
    it.lastName = String(form.lastName);
    it.phone = String(form.phone);

    return it;
  }

  static async validate(form: UserSignUpForm) {
    const errors = await validate(form);
    if (errors?.length) {
      return errors;
    }

    return null;
  }
}
