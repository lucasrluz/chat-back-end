import { PrismaClient } from '@prisma/client';
import { RoomMessageRepositoryInterface } from '../../../repositories/room-message-repository-interface';

interface RoomMessageData {
  content: string;
  date: string;
  userId: string;
  roomId: string;
}

export class PrismaRoomMessageRepository
  implements RoomMessageRepositoryInterface
{
  private prismaClient = new PrismaClient();

  async create(
    roomMessageData: RoomMessageData,
  ): Promise<{ roomMessageId: string }> {
    const response = await this.prismaClient.roomMessage.create({
      data: {
        content: roomMessageData.content,
        date: new Date().toISOString(),
        userId: roomMessageData.userId,
        roomId: roomMessageData.roomId,
      },
    });

    return {
      roomMessageId: response.roomMessageId,
    };
  }
}
