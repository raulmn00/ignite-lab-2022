import { makeNotification } from '@test/factories/notificationFactory';
import { inMemoryNotificationRepository } from '@test/repositories/inMemoryNotificationsRepository';
import { ReadNotification } from './readNotification';
import { NotificationNotFound } from './errors/notificationNotFound.error';

describe('Read Notification', () => {
  it('should be able to read a notification', async () => {
    const notificationsRepository = new inMemoryNotificationRepository();
    const readNotification = new ReadNotification(notificationsRepository);

    const newNotification = makeNotification();

    await notificationsRepository.create(newNotification);

    await readNotification.execute({
      notificationId: newNotification.id,
    });
    expect(notificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });
  it('should not be able to read a notification when it does not exists', async () => {
    const notificationsRepository = new inMemoryNotificationRepository();
    const readNotification = new ReadNotification(notificationsRepository);
    expect(() => {
      return readNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
