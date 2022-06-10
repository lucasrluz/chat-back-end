import { PrismaClient } from '@prisma/client';
import { RoomParticipantRepositoryInterface } from '../../../repositories/room-participant-repository-interface';

export class PrismaRoomParticipantRepository
  implements RoomParticipantRepositoryInterface
{
  private prismaClient = new PrismaClient();

  public async create(roomId: string, userId: string) {
    await this.prismaClient.roomParticipant.create({
      data: { roomId: roomId, userId: userId },
    });

    return {
      roomId,
      userId,
    };
  }

  public async findByRoomId(roomId: string) {
    const response = await this.prismaClient.roomParticipant.findFirst({
      where: { roomId: roomId },
    });

    return {
      roomId: response?.roomId,
      userId: response?.userId,
    };
  }
}
