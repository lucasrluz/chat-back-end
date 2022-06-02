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

  async edit(roomId: string, name: string): Promise<{ name: string }> {
    const response = await prismaClient.room.update({
      where: { roomId: roomId },
      data: { name: name },
    });

    return {
      name: response.name,
    };
  }
}
