import { UserDto } from 'app/users/dto/user.dto';
import { IsEnum, IsArray, IsBoolean, ValidateNested } from 'class-validator';
import { UUIDEntity } from 'shared/entities/uuid.entity';
import { UserPermissions } from '../enums/user-permissions.enum';
import { UserRoles } from '../enums/user-roles.enum';
import { UUIDDto } from 'shared/dtos/uuid.dto';

export class UserRoleDto extends UUIDDto {
  @IsEnum(UserRoles)
  type: UserRoles;

  @IsArray({ context: UserPermissions })
  permissions: UserPermissions[];

  @IsBoolean()
  isDefault: boolean;

  @ValidateNested({ context: UserDto })
  users?: UserDto[];
}
