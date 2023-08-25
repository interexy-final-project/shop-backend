import { IsString } from 'class-validator';
import { UUIDDto } from 'shared/dtos/uuid.dto';

export class JeansTypeDto extends UUIDDto {
  @IsString()
  hip_girth?: string;
}
