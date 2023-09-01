import { PaginationQueryDto } from "shared/dtos/pagination-query.dto";
import { IsOptional, IsEnum } from "class-validator";
import { ProductSortQueries } from "../enums/product-sort-queries.enum";

export class ProductsPaginationQueryDto extends PaginationQueryDto {
    @IsEnum(ProductSortQueries)
    @IsOptional()
    orderBy: ProductSortQueries;
  }