import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { SortDirections } from 'shared/enums/sort-directions.enum';

export class PaginationQueryDto {
  @IsPositive()
  @IsOptional()
  @IsNumber()
  count: number;
  @IsPositive()
  @IsOptional()
  @IsNumber()
  page: number;
  @IsString()
  @IsOptional()
  orderBy: string;
  @IsEnum(SortDirections)
  @IsOptional()
  direction: SortDirections;
}
