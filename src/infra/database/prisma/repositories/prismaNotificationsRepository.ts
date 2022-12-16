import { Injectable } from '@nestjs/common';
import { NotificationEntity } from '../../../../app/entities/notification';
import { NotificationRepository } from '../../../../app/repositories/notificationRepository';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNotificationsRepository implements NotificationRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async create(notification: NotificationEntity): Promise<void> {
    await this.prismaService.notification.create({
      data: {
        id: notification.id,
        content: notification.content.value,
        category: notification.category,
        recipientId: notification.recipientId,
        readAt: notification.readAt,
        createdAt: notification.createdAt,
      },
    });
  }
}
