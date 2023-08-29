import { UserDto } from 'app/users/dto/user.dto';
import { IsEnum, IsArray, IsBoolean, ValidateNested } from 'class-validator';
import { UUIDEntity } from 'shared/entities/uuid.entity';
import { UserPermissions } from '../enums/user-permissions.enum';
import { UserRoles } from '../enums/user-roles.enum';
import { UUIDDto } from 'shared/dtos/uuid.dto';
import { UserRoleEntity } from '../entities/user-role.entity';

export class UserRoleDto extends UUIDDto {
  @IsEnum(UserRoles)
  type: UserRoles;

  @IsArray({ context: UserPermissions })
  permissions: UserPermissions[];

  @IsBoolean()
  isDefault: boolean;

  @ValidateNested({ context: UserDto })
  users?: UserDto[];

  public static fromEntity(entity: UserRoleEntity) {
    const dto = new UserRoleDto();
    console.log(entity)

    dto.id = entity.id;
    dto.created = new Date(entity.created).valueOf();
    dto.updated = new Date(entity.updated).valueOf();
    dto.type = entity.type;
    dto.permissions = entity.permissions;
    dto.isDefault = entity.isDefault;
    dto.users = UserDto.fromEntities(entity.users);

    return dto;
  }

  static fromEntities(entities?: UserRoleEntity[]) {
    if (!entities?.map) {
      return;
    }

    return entities.map((entity) => this.fromEntity(entity));
  }
}
