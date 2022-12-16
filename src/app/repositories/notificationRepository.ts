import { NotificationEntity } from '../entities/notification';

export abstract class NotificationRepository {
  abstract create(notification: NotificationEntity): Promise<void>;
  abstract findById(notificationId: string): Promise<NotificationEntity | null>;
  abstract save(notification: NotificationEntity): Promise<void>;
}
