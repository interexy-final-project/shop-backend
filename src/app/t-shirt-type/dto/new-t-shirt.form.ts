import { ProductCategories } from 'app/products/enums/product-categories.enum';
import { ProductColors } from 'app/products/enums/product-colors.enum';
import { ProductSizes } from 'app/products/enums/product-sizes.enum';
import { ProductStatuses } from 'app/products/enums/product-statuses.enum';
import { ProductTypes } from 'app/products/enums/product-types.enum';
import { IsString, IsNumber, IsArray, IsEnum, validate } from 'class-validator';
import { ErrorCodes } from 'shared/enums/error-codes.enum';

export class NewTShirtTypeForm {
  @IsString({ message: ErrorCodes.FieldShouldBeString })
  waistGirth!: string;

  @IsString({ message: ErrorCodes.FieldShouldBeString })
  name!: string;

  @IsNumber()
  price!: number;

  @IsString({ each: true })
  @IsArray()
  images!: string;

  @IsEnum(ProductColors, { each: true })
  @IsArray()
  colors!: ProductColors[];

  @IsEnum(ProductSizes, { each: true })
  @IsArray()
  sizes!: ProductSizes[];

  @IsEnum(ProductStatuses)
  status!: ProductStatuses;

  @IsString({ message: ErrorCodes.FieldShouldBeString })
  description: string;

  @IsNumber()
  amount!: number;

  @IsEnum(ProductCategories)
  category!: ProductCategories;

  @IsEnum(ProductTypes)
  type!: ProductTypes;

  static from(form: NewTShirtTypeForm) {
    const it = new NewTShirtTypeForm();
    it.waistGirth = form.waistGirth;
    it.name = form.name;
    it.price = form.price;
    it.images = form.images;
    it.colors = form.colors;
    it.sizes = form.sizes;
    it.status = form.status;
    it.description = form.description;
    it.amount = form.amount;
    it.category = form.category;
    it.type = ProductTypes.JEANS;
    return it;
  }

  static async validate(form: NewTShirtTypeForm) {
    const errors = await validate(form);
    if (errors?.length) {
      return errors;
    }

    return null;
  }
}
