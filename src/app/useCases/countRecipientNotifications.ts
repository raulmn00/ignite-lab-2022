import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notificationRepository';
import { NotificationNotFound } from './errors/notificationNotFound.error';

interface countRecipientNotificationsRequest {
  recipientId: string;
}

interface countRecipientNotificationsResponse {
  count: number;
}

@Injectable()
export class CountRecipientNotifications {
  constructor(private notificationsRepository: NotificationRepository) {}
  async execute(
    request: countRecipientNotificationsRequest,
  ): Promise<countRecipientNotificationsResponse> {
    const { recipientId } = request;

    const count = await this.notificationsRepository.countManyByRecipientId(
      recipientId,
    );
    return {
      count,
    };
  }
}
