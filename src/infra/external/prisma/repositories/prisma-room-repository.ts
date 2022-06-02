import { RoomRepositoryInterface } from '../../../repositories/room-repository-interface';
import { prismaClient } from '../prisma-client';

export class PrismaRoomRepository implements RoomRepositoryInterface {
  async create(name: string): Promise<{ roomId: string; name: string }> {
    const response = await prismaClient.room.create({ data: { name: name } });

    return {
      roomId: response.roomId,
      name: response.name,
    };
  }
}
