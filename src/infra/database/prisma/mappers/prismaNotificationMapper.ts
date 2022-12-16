import { NotificationEntity } from '@app/entities/notification';

export class PrismaNotificationMapper {
  static toPrisma(notification: NotificationEntity) {
    return {
      id: notification.id,
      content: notification.content.value,
      category: notification.category,
      recipientId: notification.recipientId,
      readAt: notification.readAt,
      createdAt: notification.createdAt,
    };
  }
}
