import { Injectable } from '@nestjs/common';
import { NotificationEntity } from '@app/entities/notification';
import { NotificationRepository } from '@app/repositories/notificationRepository';
import { PrismaService } from '../prisma.service';
import { PrismaNotificationMapper } from '../mappers/prismaNotificationMapper';

@Injectable()
export class PrismaNotificationsRepository implements NotificationRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async save(notification: NotificationEntity): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async findById(notificationId: string): Promise<NotificationEntity | null> {
    throw new Error('Method not implemented.');
  }
  async create(notification: NotificationEntity): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);
    await this.prismaService.notification.create({
      data: raw,
    });
  }
}
