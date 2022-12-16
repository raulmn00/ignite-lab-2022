import { NotificationEntity } from '@app/entities/notification';
import { NotificationContent } from '@app/entities/notificationContent';
import { inMemoryNotificationRepository } from '@test/repositories/inMemoryNotificationsRepository';
import { CancelNotification } from './cancelNotification';
import { NotificationNotFound } from './errors/notificationNotFound.error';

describe('Cancel Notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationsRepository = new inMemoryNotificationRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    const newNotification = new NotificationEntity({
      category: 'Social',
      content: new NotificationContent(
        'Voce recebeu uma solicitação de amizade',
      ),
      recipientId: 'Example recipient Id',
    });

    await notificationsRepository.create(newNotification);

    await cancelNotification.execute({
      notificationId: newNotification.id,
    });
    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });
  it('should not be able to cancel a notification when it does not exists', async () => {
    const notificationsRepository = new inMemoryNotificationRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);
    expect(() => {
      return cancelNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
