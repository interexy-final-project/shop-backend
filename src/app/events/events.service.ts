import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserDeletedEvent } from './user-deleted.event';

@Injectable()
export class EventsService {
  @OnEvent('user.deleted')
  async notifyUser(payload: UserDeletedEvent) {
    const userEmail = payload.user.email;
  }
}
