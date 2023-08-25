import { UserDto } from 'app/users/dto/user.dto';
import { IsEnum, IsArray, IsBoolean, ValidateNested } from 'class-validator';
import { UUIDEntity } from 'shared/entities/uuid.entity';
import { EUserPermissions } from '../enums/user-permissions.enum';
import { EUserRoles } from '../enums/user-roles.enum';
import { UUIDDto } from 'shared/dtos/uuid.dto';

export class UserRoleDto extends UUIDDto {
  @IsEnum(EUserRoles)
  type: EUserRoles;

  @IsArray({ context: EUserPermissions })
  permissions: EUserPermissions[];

  @IsBoolean()
  isDefault: boolean;

  @ValidateNested({ context: UserDto })
  users?: UserDto[];
}
