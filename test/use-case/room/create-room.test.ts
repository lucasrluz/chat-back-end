import { PrismaClient } from '@prisma/client';
import { PrismaRoomRepository } from '../../../src/infra/external/prisma/repositories/prisma-room-repository';
import { CreateRoomUseCase } from '../../../src/use-case/room/create-room-use-case';

describe('Create room use case tests', () => {
  const prismaClient = new PrismaClient();

  const roomRepository = new PrismaRoomRepository();
  const createRoomUseCase = new CreateRoomUseCase(roomRepository);

  beforeAll(async () => {
    await prismaClient.roomParticipant.deleteMany();
    await prismaClient.room.deleteMany();
    await prismaClient.user.deleteMany();
  });

  it('Should return new room', async () => {
    const roomData = {
      name: 'a',
    };

    const response = await createRoomUseCase.perform(roomData.name);

    expect(response.isSuccess()).toEqual(true);
    expect(response.value.name).toEqual(roomData.name);

    await prismaClient.room.deleteMany();
  });

  it('Should return error message', async () => {
    const roomData = {
      name: '',
    };

    const response = await createRoomUseCase.perform(roomData.name);

    expect(response.isError()).toEqual(true);
    expect(response.value).toEqual('Name should not be empty');
  });
});
