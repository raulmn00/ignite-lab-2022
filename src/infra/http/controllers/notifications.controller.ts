import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateNotificationBody } from '../dto/createNotificationBody';
import { SendNotification } from '@app/useCases/sendNotification';
import { NotificationViewModel } from '../viewModels/notificationViewModel';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly sendNotification: SendNotification) {}

  @Post()
  async createNotification(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      category,
      content,
    });

  
    return {
      notification: NotificationViewModel.toHttp(notification)
    };
  }
}
