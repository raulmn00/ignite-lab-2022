import { NotificationEntity } from '@app/entities/notification';
import { NotificationRepository } from '@app/repositories/notificationRepository';

export class inMemoryNotificationRepository implements NotificationRepository {
  public notifications: NotificationEntity[] = [];
  async countManyByRecipientId(recipientId: string): Promise<number> {
    return this.notifications.filter(
      (notification) => notification.recipientId === recipientId,
    ).length;
  }

  async findManyByRecipientId(
    recipientId: string,
  ): Promise<NotificationEntity[]> {
    return this.notifications.filter(
      (notification) => notification.recipientId === recipientId,
    );
  }
  async save(notification: NotificationEntity): Promise<void> {
    const notificationIndex = this.notifications.findIndex(
      (item) => item.id === notification.id,
    );
    if (notificationIndex >= 0) {
      this.notifications[notificationIndex] = notification;
    }
  }

  async findById(notificationId: string): Promise<NotificationEntity | null> {
    const notificationFinded = this.notifications.find(
      (item) => item.id === notificationId,
    );
    if (!notificationFinded) {
      return null;
    }
    return notificationFinded;
  }

  async create(notification: NotificationEntity) {
    this.notifications.push(notification);
  }
}
