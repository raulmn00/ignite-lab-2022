import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notificationRepository';
import { NotificationNotFound } from './errors/notificationNotFound.error';

interface cancelNotificationRequest {
  notificationId: string;
}

type cancelNotificationResponse = void;

@Injectable()
export class CancelNotification {
  constructor(private notificationsRepository: NotificationRepository) {}
  async execute(
    request: cancelNotificationRequest,
  ): Promise<cancelNotificationResponse> {
    const { notificationId } = request;
    const notificationFinded = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notificationFinded) {
      throw new NotificationNotFound();
    }
    notificationFinded.cancel();

    await this.notificationsRepository.save(notificationFinded);
  }
}
