import { NotificationEntity } from '../entities/notification';
import { NotificationContent } from '../entities/notificationContent';
import { NotificationRepository } from '../repositories/notificationRepository';

interface SendNotificationRequest {
  recipientId: string;
  category: string;
  content: string;
}

interface SendNotificationResponse {
  notification: NotificationEntity;
}

export class SendNotification {
  constructor(private notificationsRepository: NotificationRepository) {}
  async execute(
    request: SendNotificationRequest,
  ): Promise<SendNotificationResponse> {
    const { recipientId, content, category } = request;
    const notification = new NotificationEntity({
      recipientId,
      content: new NotificationContent(content),
      category,
    });

    await this.notificationsRepository.create(notification);

    return {
      notification,
    };
  }
}
