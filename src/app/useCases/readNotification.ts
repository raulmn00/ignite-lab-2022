import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notificationRepository';
import { NotificationNotFound } from './errors/notificationNotFound.error';

interface readNotificationRequest {
  notificationId: string;
}

type readNotificationResponse = void;

@Injectable()
export class ReadNotification {
  constructor(private notificationsRepository: NotificationRepository) {}
  async execute(
    request: readNotificationRequest,
  ): Promise<readNotificationResponse> {
    const { notificationId } = request;
    const notificationFinded = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notificationFinded) {
      throw new NotificationNotFound();
    }
    notificationFinded.read();

    await this.notificationsRepository.save(notificationFinded);
  }
}
