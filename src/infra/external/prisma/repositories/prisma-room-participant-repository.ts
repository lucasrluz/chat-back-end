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

  public async findByRoomParticipantIdAndRoomId(
    roomParticipantId: string,
    roomId: string,
  ) {
    const response = await this.prismaClient.roomParticipant.findFirst({
      where: { roomId: roomId, userId: roomParticipantId },
    });

    return {
      roomId: response?.roomId,
      userId: response?.userId,
    };
  }

  public async deleteByRoomParticipantId(roomParticipantId: string) {
    await this.prismaClient.roomParticipant.delete({
      where: { userId: roomParticipantId },
    });
  }
}
