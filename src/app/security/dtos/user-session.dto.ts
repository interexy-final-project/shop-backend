import { IsString } from "class-validator";

import { UserEntity } from "app/users/entities/user.entity";

export class UserSessionDto {
  @IsString()
  email: string;

  constructor() {
  }

  public static from(dto: UserSessionDto): UserSessionDto {
    return {
      email: dto.email,
    };
  }

  public static fromEntity(entity: UserEntity): UserSessionDto {
    return {
      email: entity.email,
    };
  }
}