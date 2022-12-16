import { Injectable } from '@nestjs/common';
import { NotificationEntity } from '@app/entities/notification';
import { NotificationRepository } from '@app/repositories/notificationRepository';
import { PrismaService } from '../prisma.service';
import { PrismaNotificationMapper } from '../mappers/prismaNotificationMapper';

@Injectable()
export class PrismaNotificationsRepository implements NotificationRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async countManyByRecipientId(recipientId: string): Promise<number> {
    const count = await this.prismaService.notification.count({
      where: { recipientId: recipientId },
    });
    return count;
  }
  async findManyByRecipientId(
    recipientId: string,
  ): Promise<NotificationEntity[]> {
    const notifications = await this.prismaService.notification.findMany({
      where: { recipientId: recipientId },
    });
    return notifications.map(PrismaNotificationMapper.toDomain);
  }
  async save(notification: NotificationEntity): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);
    await this.prismaService.notification.update({
      where: { id: raw.id },
      data: raw,
    });
  }
  async findById(notificationId: string): Promise<NotificationEntity | null> {
    const notification = await this.prismaService.notification.findUnique({
      where: { id: notificationId },
    });
    if (!notification) {
      return null;
    }
    return PrismaNotificationMapper.toDomain(notification);
  }
  async create(notification: NotificationEntity): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);
    await this.prismaService.notification.create({
      data: raw,
    });
  }
}
