import { UserPermissions } from 'app/user-roles/enums/user-permissions.enum';
import { UserEntity } from 'app/users/entities/user.entity';
import { IsUUID, IsString, IsNumber, IsArray } from 'class-validator';

export class UserSessionDto {
  @IsUUID()
  id: string;

  @IsString()
  email: string;

  @IsNumber()
  role_id: number;

  @IsArray({ context: UserPermissions })
  permissions: UserPermissions[];

  constructor() {}

  public static from(dto: UserSessionDto): UserSessionDto {
    return {
      id: dto.id,
      email: dto.email,
      role_id: dto.role_id,
      permissions: dto.permissions,
    };
  }

  public static fromEntity(
    entity: UserEntity,
    permissions: UserPermissions[],
  ): UserSessionDto {
    return {
      id: entity.id,
      email: entity.email,
      role_id: entity.roleId,
      permissions,
    };
  }
}
