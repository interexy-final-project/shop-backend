import { UserDto } from 'app/users/dto/user.dto';
import { IsString, ValidateNested } from 'class-validator';
import { UUIDDto } from 'shared/dtos/uuid.dto';

export class ShippingAddressDto extends UUIDDto {
  @IsString()
  address: string;

  @IsString()
  city: string;

  @IsString()
  phone!: string;

  @IsString()
  userId!: string;

  @IsString()
  postalCode!: string;

  @ValidateNested({ context: UserDto })
  user?: UserDto;

  public static fromEntity(entity?: ShippingAddressDto) {
    if (!entity) {
      return;
    }

    const dto = new ShippingAddressDto();
    dto.id = entity.id;
    dto.address = entity.address;
    dto.city = entity.city;
    dto.phone = entity.phone;
    dto.userId = entity.userId;
    dto.created = entity.created;
    dto.updated = entity.updated;
    dto.postalCode = entity.postalCode;
    return dto;
  }

  public static fromEntities(entities?: ShippingAddressDto[]) {
    if (!entities?.map) {
      return;
    }

    return entities.map((entity) => this.fromEntity(entity));
  }
}
