import { NotificationEntity } from '@app/entities/notification';
import { NotificationContent } from '@app/entities/notificationContent';
import { Notification as RawNotification } from '@prisma/client';

export class PrismaNotificationMapper {
  static toPrisma(notification: NotificationEntity) {
    return {
      id: notification.id,
      content: notification.content.value,
      category: notification.category,
      recipientId: notification.recipientId,
      readAt: notification.readAt,
      createdAt: notification.createdAt,
      canceledAt: notification.canceledAt,
    };
  }

  static toDomain(raw: RawNotification): NotificationEntity {
    return new NotificationEntity(
      {
        category: raw.category,
        content: new NotificationContent(raw.content),
        recipientId: raw.recipientId,
        readAt: raw.readAt,
        createdAt: raw.createdAt,
        canceledAt: raw.canceledAt,
      },
      raw.id,
    );
  }
}
