import { PaginationQueryDto } from "shared/dtos/pagination-query.dto";
import { OrderSortQueries } from "../enums/order-sort-queries.enum";
import { IsOptional, IsEnum } from "class-validator";

export class OrderPaginationQueryDto extends PaginationQueryDto {
    @IsEnum(OrderSortQueries)
    @IsOptional()
    orderBy: OrderSortQueries;
  }