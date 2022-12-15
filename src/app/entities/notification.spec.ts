import { NotificationEntity } from './notification';
import { NotificationContent } from './notificationContent';

describe('Notification Entity', () => {
  it('should be able to create a notification', () => {
    const notification = new NotificationEntity({
      category: 'Categoria legal',
      content: new NotificationContent('Nova solicitação de amizade'),
      recipientId: 'example recipient id',
    });
    expect(notification).toBeTruthy();
  });
});
