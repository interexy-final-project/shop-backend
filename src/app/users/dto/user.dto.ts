import { UUIDDto } from "shared/dto/uuid.dto";

import { UserEntity } from "../entities/user.entity";
export class UserDto extends UUIDDto {

  email!: string;


  static fromEntity(entity?: UserEntity) {
    if (!entity) { return; }
    const it = new UserDto();
    it.id = entity.id;
    it.created = entity.created.valueOf();
    it.updated = entity.updated.valueOf();
    it.email = entity.email;

    return it;
  }

  static fromEntities(entities?: UserEntity[]) {
    if (!entities?.map) { return; }
    return entities.map(entity => this.fromEntity(entity));
  }
}