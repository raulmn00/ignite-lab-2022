import { NotificationEntity } from '../entities/notification';

export abstract class NotificationRepository {
  abstract create(notification: NotificationEntity): Promise<void>;
}
