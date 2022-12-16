import { inMemoryNotificationRepository } from '@test/repositories/inMemoryNotificationsRepository';
import { SendNotification } from './sendNotification';

const notificationsRepository = new inMemoryNotificationRepository();

describe('Send Notification', () => {
  it('should be able to send a notification', async () => {
    const sendNotification = new SendNotification(notificationsRepository);
    const { notification } = await sendNotification.execute({
      category: 'social',
      content: 'voce tem uma nova solicitação de amizade',
      recipientId: 'example recipient id',
    });
    expect(notificationsRepository.notifications).toHaveLength(1);
  });
});
