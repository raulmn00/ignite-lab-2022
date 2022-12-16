import { Injectable } from '@nestjs/common';
import { NotificationEntity } from '@app/entities/notification';
import { NotificationRepository } from '@app/repositories/notificationRepository';
import { PrismaService } from '../prisma.service';
import { PrismaNotificationMapper } from '../mappers/prismaNotificationMapper';

@Injectable()
export class PrismaNotificationsRepository implements NotificationRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async create(notification: NotificationEntity): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);
    await this.prismaService.notification.create({
      data: raw,
    });
  }
}
