import { ProductCategories } from '../enums/product-categories.enum';
import { ProductColors } from '../enums/product-colors.enum';
import { ProductSizes } from '../enums/product-sizes.enum';
import { ProductTypes } from '../enums/product-types.enum';

export interface ProductFilter {
  category: ProductCategories | null;
  type: ProductTypes | null;
  colors: ProductColors[];
  sizes: ProductSizes[];
}
