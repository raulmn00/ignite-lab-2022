import { NotificationEntity } from '@app/entities/notification';

export class NotificationViewModel {
  static toHttp(notification: NotificationEntity) {
    return {
      id: notification.id,
      content: notification.content.value,
      category: notification.category,
      recipientId: notification.recipientId,
    };
  }
}
