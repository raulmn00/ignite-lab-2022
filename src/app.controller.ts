import { Controller, Get, Post } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { randomUUID } from 'node:crypto';

@Controller('notifications')
export class AppController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  getAll() {
    return this.prismaService.notification.findMany();
  }

  @Post()
  async createNotification() {
    await this.prismaService.notification.create({
      data: {
        id: randomUUID(),
        content: 'Notificação legal',
        category: 'Categoria Legal',
        recipientId: randomUUID(),
      },
    });
  }
}
