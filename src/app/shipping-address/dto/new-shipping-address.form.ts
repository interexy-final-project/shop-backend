import { IsString, validate } from 'class-validator';
import { UUIDDto } from 'shared/dtos/uuid.dto';

export class NewShippingAddressForm extends UUIDDto {
  @IsString()
  address: string;

  @IsString()
  city: string;

  @IsString()
  phone!: string;

  @IsString()
  userId!: string;

  @IsString()
  postalCode!: string;

  static from(form: NewShippingAddressForm) {
    const it = new NewShippingAddressForm();
    it.address = form.address;
    it.city = form.city;
    it.phone = form.phone;
    it.userId = form.userId;
    it.postalCode = form.postalCode;
    return it;
  }

  static async validate(form: NewShippingAddressForm) {
    const errors = await validate(form);
    if (errors?.length) {
      return errors;
    }

    return null;
  }
}
