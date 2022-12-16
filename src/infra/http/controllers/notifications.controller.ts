import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateNotificationBody } from '../dto/createNotificationBody';
import { SendNotification } from 'src/app/useCases/sendNotification';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly sendNotification: SendNotification) {}

  @Post()
  async createNotification(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    const notification = await this.sendNotification.execute({
      recipientId,
      category,
      content,
    });
  }
}
