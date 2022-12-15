import { NotificationEntity } from '../../src/app/entities/notification';
import { NotificationRepository } from '../../src/app/repositories/notificationRepository';

export class inMemoryNotificationRepository implements NotificationRepository {
  public notifications: NotificationEntity[] = [];
  async create(notification: NotificationEntity) {
    this.notifications.push(notification);
  }
}
