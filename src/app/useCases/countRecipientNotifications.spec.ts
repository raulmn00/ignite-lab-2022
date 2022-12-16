import { makeNotification } from '@test/factories/notificationFactory';
import { inMemoryNotificationRepository } from '@test/repositories/inMemoryNotificationsRepository';
import { CountRecipientNotifications } from './countRecipientNotifications';

describe('Count Recipient Notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new inMemoryNotificationRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );
    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );
    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-2' }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient-1',
    });
    expect(count).toEqual(2);
  });
});
