import { Injectable } from '@nestjs/common';
import { UserEntity } from 'app/users/entities/user.entity';

@Injectable()
export class UserDeletedEvent {
  constructor(public user: UserEntity) {}
}
