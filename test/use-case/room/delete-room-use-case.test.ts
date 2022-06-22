import { PrismaClient } from '@prisma/client';
import { PrismaRoomRepository } from '../../../src/infra/external/prisma/repositories/prisma-room-repository';
import { CreateRoomUseCase } from '../../../src/use-case/room/create-room-use-case';
import { DeleteRoomUseCase } from '../../../src/use-case/room/delete-room-use-case';

describe('Delete room use case', () => {
  const prismaClient = new PrismaClient();

  const roomRepository = new PrismaRoomRepository();

  const createRoomUseCase = new CreateRoomUseCase(roomRepository);
  const deleteRoomUseCase = new DeleteRoomUseCase(roomRepository);

  beforeAll(async () => {
    await prismaClient.roomParticipant.deleteMany();
    await prismaClient.room.deleteMany();
    await prismaClient.user.deleteMany();
  });

  it('Should delete room', async () => {
    const roomData = {
      name: 'a',
    };

    const createRoomResponse = await createRoomUseCase.perform(roomData.name);
    const deleteRoomResponse = await deleteRoomUseCase.perform(
      createRoomResponse.value.roomId,
    );

    expect(deleteRoomResponse.isSuccess()).toEqual(true);
  });

  it('Should return error', async () => {
    const deleteRoomResponse = await deleteRoomUseCase.perform('invalidRoomId');

    expect(deleteRoomResponse.isError()).toEqual(true);
    expect(deleteRoomResponse.value).toEqual('Room not found');
  });
});
