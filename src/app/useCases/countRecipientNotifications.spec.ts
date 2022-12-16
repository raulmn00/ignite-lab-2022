import { NotificationEntity } from '@app/entities/notification';
import { NotificationContent } from '@app/entities/notificationContent';
import { inMemoryNotificationRepository } from '@test/repositories/inMemoryNotificationsRepository';
import { CountRecipientNotifications } from './countRecipientNotifications';

describe('Count Recipient Notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new inMemoryNotificationRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    await notificationsRepository.create(
      new NotificationEntity({
        category: 'Social',
        content: new NotificationContent(
          'Voce recebeu uma solicitação de amizade',
        ),
        recipientId: 'recipient-1',
      }),
    );
    await notificationsRepository.create(
      new NotificationEntity({
        category: 'Social',
        content: new NotificationContent(
          'Voce recebeu uma solicitação de amizade',
        ),
        recipientId: 'recipient-1',
      }),
    );
    await notificationsRepository.create(
      new NotificationEntity({
        category: 'Social',
        content: new NotificationContent(
          'Voce recebeu uma solicitação de amizade',
        ),
        recipientId: 'recipient-2',
      }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient-1',
    });
    expect(count).toEqual(2);
  });
});
