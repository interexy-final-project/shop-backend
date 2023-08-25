import { UserDto } from 'app/users/dto/user.dto';
import { UserEntity } from 'app/users/entities/user.entity';
import { IsString, ValidateNested } from 'class-validator';
import { UUIDDto } from 'shared/dtos/uuid.dto';
import { UUIDEntity } from 'shared/entities/uuid.entity';

export class ShippingAddressDto extends UUIDDto {
  @IsString()
  address: string;

  @IsString()
  city: string;

  @IsString()
  phone!: string;

  @IsString()
  user_id!: string;

  @ValidateNested({ context: UserDto })
  user?: UserDto;
}
