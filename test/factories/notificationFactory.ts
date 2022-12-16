import {
  NotificationEntity,
  NotificationProps,
} from '@app/entities/notification';
import { NotificationContent } from '@app/entities/notificationContent';

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
  return new NotificationEntity({
    category: 'Social',
    content: new NotificationContent('Voce recebeu uma solicitação de amizade'),
    recipientId: 'recipient-2',
    ...override,
  });
}
