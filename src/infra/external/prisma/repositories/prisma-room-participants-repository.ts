import { PrismaClient } from '@prisma/client';
import { RoomParticipantsRepositoryInterface } from '../../../repositories/room-participants-repository-interface';

export class PrismaRoomParticipantsRepository
  implements RoomParticipantsRepositoryInterface
{
  private prismaClient = new PrismaClient();

  public async create(roomId: string, userId: string) {
    await this.prismaClient.roomParticipants.create({
      data: { roomId: roomId, userId: userId },
    });

    return {
      roomId,
      userId,
    };
  }

  public async findByRoomId(roomId: string) {
    const response = await this.prismaClient.roomParticipants.findFirst({
      where: { roomId: roomId },
    });

    return {
      roomId: response?.roomId,
      userId: response?.userId,
    };
  }
}
