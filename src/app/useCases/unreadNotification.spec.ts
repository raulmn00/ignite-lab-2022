import { makeNotification } from '@test/factories/notificationFactory';
import { inMemoryNotificationRepository } from '@test/repositories/inMemoryNotificationsRepository';
import { UnreadNotification } from './unreadNotification';
import { NotificationNotFound } from './errors/notificationNotFound.error';

describe('Unread Notification', () => {
  it('should be able to unread a notification', async () => {
    const notificationsRepository = new inMemoryNotificationRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    const newNotification = makeNotification({ readAt: new Date() });

    await notificationsRepository.create(newNotification);

    await unreadNotification.execute({
      notificationId: newNotification.id,
    });
    expect(notificationsRepository.notifications[0].readAt).toBeNull();
  });
  it('should not be able to read a notification when it does not exists', async () => {
    const notificationsRepository = new inMemoryNotificationRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);
    expect(() => {
      return unreadNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
