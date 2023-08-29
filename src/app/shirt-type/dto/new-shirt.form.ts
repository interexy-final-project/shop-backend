import { ProductCategories } from 'app/products/enums/product-categories.enum';
import { ProductColors } from 'app/products/enums/product-colors.enum';
import { ProductSizes } from 'app/products/enums/product-sizes.enum';
import { ProductStatuses } from 'app/products/enums/product-statuses.enum';
import { IsArray, IsEnum, IsNumber, IsString, validate } from 'class-validator';

export class NewShirtForm {
  @IsString()
  name!: string;

  @IsNumber()
  price!: number;

  @IsString({ each: true })
  @IsArray()
  images!: string[];

  @IsEnum(ProductColors, { each: true })
  @IsArray()
  colors!: ProductColors[];

  @IsEnum(ProductSizes, { each: true })
  @IsArray()
  sizes!: ProductSizes[];

  @IsEnum(ProductStatuses, { each: true })
  status!: ProductStatuses;

  @IsString()
  description!: string;

  @IsNumber()
  amount!: number;

  @IsEnum(ProductCategories, { each: true })
  category!: ProductCategories;
  @IsString()
  sleeveLength!: string;

  static from(body: NewShirtForm) {
    const it = new NewShirtForm();
    it.name = body.name;
    it.price = body.price;
    it.images = body.images;
    it.colors = body.colors;
    it.sizes = body.sizes;
    it.status = body.status;
    it.description = body.description;
    it.amount = body.amount;
    it.category = body.category;
    it.sleeveLength = body.sleeveLength;

    return it;
  }

  static async validateForm(body: NewShirtForm) {
    const errors = await validate(body);
    if (errors?.length) {
      return errors;
    }
    return null;
  }
}
