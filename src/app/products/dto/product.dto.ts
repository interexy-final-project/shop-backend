import {
  IsArray,
  IsEnum,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ProductColors } from '../enums/product-colors.enum';
import { ProductSizes } from '../enums/product-sizes.enum';
import { ProductStatuses } from '../enums/product-statuses.enum';
import { CartItemDto } from 'app/cart/dto/cart-item.dto';
import { ProductEntity } from '../entities/product.entity';
import { UUIDDto } from 'shared/dtos/uuid.dto';
import { ProductCategories } from '../enums/product-categories.enum';
import { JeansTypeEntity } from 'app/jeans-type/entities/jeans-type.entity';
import { TShirtTypeEntity } from 'app/t-shirt-type/entities/t-shirt.entity';
import { ShirtTypeEntity } from 'app/shirt-type/entities/shirt-type.entity';
import { ProductTypes } from '../enums/product-types.enum';

export class ProductDto extends UUIDDto {
  @IsString()
  name!: string;

  @IsNumber()
  price!: number;

  @IsString()
  image!: string;

  @IsEnum(ProductColors)
  @IsArray()
  colors!: ProductColors[];

  @IsEnum(ProductSizes)
  @IsArray()
  sizes!: ProductSizes[];

  @IsEnum(ProductStatuses)
  status!: ProductStatuses;

  @IsEnum(ProductTypes)
  type!: ProductTypes;

  @IsString()
  description: string;

  @IsNumber()
  amount!: number;

  @IsEnum(ProductCategories)
  category!: ProductCategories;

  @ValidateNested({ context: CartItemDto })
  cartItem?: CartItemDto;

  public static fromEntity(
    entity?:
      | ProductEntity
      | JeansTypeEntity
      | TShirtTypeEntity
      | ShirtTypeEntity,
  ) {
    if (!entity) {
      return;
    }
    let it = null;
    if (JeansTypeEntity) {
      it = new JeansTypeEntity();
    }

    if (TShirtTypeEntity) {
      it = new TShirtTypeEntity();
    }

    if (ShirtTypeEntity) {
      it = new ShirtTypeEntity();
    }

    it.id = entity.id;
    it.name = entity.name;
    it.description = entity.description;
    it.image = entity.image;
    it.colors = entity.colors;
    it.sizes = entity.sizes;
    it.price = entity.price;
    it.status = entity.status;
    it.amount = entity.amount;
    it.category = entity.category;
    it.type = entity.type;
    it.created = entity.created.valueOf();
    it.updated = entity.updated.valueOf();

    return it;
  }

  public static fromEntities(
    entities?:
      | ProductEntity[]
      | JeansTypeEntity[]
      | TShirtTypeEntity[]
      | ShirtTypeEntity[],
  ) {
    if (!entities?.map) {
      return;
    }

    return entities.map((entity) => this.fromEntity(entity));
  }
}
