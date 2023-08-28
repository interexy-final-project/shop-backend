import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsPositive()
  @IsOptional()
  @IsNumber()
  limit: number;
  @IsPositive()
  @IsOptional()
  @IsNumber()
  offset: number;
}
