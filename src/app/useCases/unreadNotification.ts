import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notificationRepository';
import { NotificationNotFound } from './errors/notificationNotFound.error';

interface UnreadNotificationRequest {
  notificationId: string;
}

type UnreadNotificationResponse = void;

@Injectable()
export class UnreadNotification {
  constructor(private notificationsRepository: NotificationRepository) {}
  async execute(
    request: UnreadNotificationRequest,
  ): Promise<UnreadNotificationResponse> {
    const { notificationId } = request;
    const notificationFinded = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notificationFinded) {
      throw new NotificationNotFound();
    }
    notificationFinded.unread();

    await this.notificationsRepository.save(notificationFinded);
  }
}
