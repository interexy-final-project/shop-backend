import {
  Entity,
  Property,
  Enum,
  OneToMany,
  Index,
  EntityRepositoryType,
  Unique,
  EnumType,
  PrimaryKey,
} from '@mikro-orm/core';
import { UserRolesRepo } from 'app/user-roles/repo/user-roles.repo';
import { EUserRoles } from 'app/user-roles/enums/user-roles.enum';
import { IDEntity } from 'shared/entities/id.entity';
import { EUserPermissions } from 'app/user-roles/enums/user-permissions.enum';
import { UserEntity } from 'app/users/entities/user.entity';

@Entity({ tableName: 'user_roles', customRepository: () => UserRolesRepo })
export class UserRoleEntity extends IDEntity {
  [EntityRepositoryType]?: UserRolesRepo;

  @Property({ name: 'type', type: 'text', unique: true })
  type!: EUserRoles;

  @Property({ name: 'is_default', type: 'boolean' })
  isDefault!: boolean;

  @Enum({
    type: EnumType,
    name: 'permissions',
    array: true,
    items: () => EUserPermissions,
  })
  permissions!: EUserPermissions[];

  @OneToMany(() => UserEntity, (e) => e.role)
  users?: UserEntity[];
}
