import { ProductCategories } from 'app/products/enums/product-categories.enum';
import { ProductColors } from 'app/products/enums/product-colors.enum';
import { ProductSizes } from 'app/products/enums/product-sizes.enum';
import { ProductStatuses } from 'app/products/enums/product-statuses.enum';
import { ProductTypes } from 'app/products/enums/product-types.enum';
import { IsArray, IsEnum, IsNumber, IsString, validate } from 'class-validator';
import { ErrorCodes } from 'shared/enums/error-codes.enum';

export class NewJeansTypeForm {
  @IsString({ message: ErrorCodes.FieldShouldBeString })
  hipGirth!: string;

  @IsString()
  name!: string;

  @IsNumber()
  price!: number;

  @IsString()
  image!: string;

  @IsEnum(ProductColors, { each: true })
  @IsArray()
  colors!: ProductColors[];

  @IsEnum(ProductSizes, { each: true })
  @IsArray()
  sizes!: ProductSizes[];

  @IsEnum(ProductStatuses)
  status!: ProductStatuses;

  @IsString()
  description: string;

  @IsNumber()
  amount!: number;

  @IsEnum(ProductCategories)
  category!: ProductCategories;

  @IsEnum(ProductTypes)
  type!: ProductTypes;

  static from(form: NewJeansTypeForm) {
    const it = new NewJeansTypeForm();
    it.hipGirth = form.hipGirth;
    it.name = form.name;
    it.price = form.price;
    it.image = form.image;
    it.colors = form.colors;
    it.sizes = form.sizes;
    it.status = form.status;
    it.description = form.description;
    it.amount = form.amount;
    it.category = form.category;
    it.type = ProductTypes.JEANS;
    return it;
  }

  static async validate(form: NewJeansTypeForm) {
    const errors = await validate(form);
    if (errors?.length) {
      return errors;
    }

    return null;
  }
}
