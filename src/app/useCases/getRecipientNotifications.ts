import { NotificationEntity } from '@app/entities/notification';
import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notificationRepository';

interface getRecipientNotificationsRequest {
  recipientId: string;
}

interface getRecipientNotificationsResponse {
  notifications: NotificationEntity[];
}

@Injectable()
export class GetRecipientNotifications {
  constructor(private notificationsRepository: NotificationRepository) {}
  async execute(
    request: getRecipientNotificationsRequest,
  ): Promise<getRecipientNotificationsResponse> {
    const { recipientId } = request;

    const notifications =
      await this.notificationsRepository.findManyByRecipientId(recipientId);
    return {
      notifications,
    };
  }
}
