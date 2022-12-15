import { NotificationContent } from './notificationContent';

describe('Notification Content', () => {
  it('should be able to create a notification content', () => {
    const content = new NotificationContent(
      'Notificação com mais de 5 caracteres e menos de 240.',
    );
    expect(content).toBeTruthy();
  });

  it('should not be able to create a notification content with less than 5 characters', () => {
    expect(() => new NotificationContent('aaa')).toThrow();
  });

  it('should not be able to create a notification content with more than 240 characters', () => {
    expect(() => new NotificationContent('a'.repeat(245))).toThrow();
  });
});
