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

  async findById(
    roomId: string,
  ): Promise<{ roomId: string | undefined; name: string | undefined }> {
    const response = await prismaClient.room.findFirst({
      where: { roomId: roomId },
    });

    return {
      roomId: response?.roomId,
      name: response?.name,
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

  async deleteById(roomId: string) {
    await prismaClient.room.delete({ where: { roomId: roomId } });
  }
}
