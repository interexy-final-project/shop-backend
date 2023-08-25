import {
  Entity,
  Property,
  Enum,
  OneToMany,
  EntityRepositoryType,
  EnumType,
} from '@mikro-orm/core';
import { UserRolesRepo } from 'app/user-roles/repo/user-roles.repo';
import { UserRoles } from 'app/user-roles/enums/user-roles.enum';
import { UserPermissions } from 'app/user-roles/enums/user-permissions.enum';
import { UserEntity } from 'app/users/entities/user.entity';
import { UUIDEntity } from 'shared/entities/uuid.entity';

@Entity({ tableName: 'user_roles', customRepository: () => UserRolesRepo })
export class UserRoleEntity extends UUIDEntity {
  [EntityRepositoryType]?: UserRolesRepo;

  @Property({ name: 'type', type: 'text', unique: true })
  type!: UserRoles;

  @Property({ name: 'is_default', type: 'boolean' })
  isDefault!: boolean;

  @Enum({
    type: EnumType,
    name: 'permissions',
    array: true,
    items: () => UserPermissions,
  })
  permissions!: UserPermissions[];

  @OneToMany(() => UserEntity, (e) => e.role)
  users?: UserEntity[];
}
