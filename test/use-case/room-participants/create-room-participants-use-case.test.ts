import { PrismaClient } from '@prisma/client';
import { PrismaRoomParticipantRepository } from '../../../src/infra/external/prisma/repositories/prisma-room-participant-repository';
import { PrismaRoomRepository } from '../../../src/infra/external/prisma/repositories/prisma-room-repository';
import { PrismaUserRepository } from '../../../src/infra/external/prisma/repositories/prisma-user-repository';
import { CreateRoomParticipantUseCase } from '../../../src/use-case/room-participant/create-room-participant-use-case';
import { CreateRoomUseCase } from '../../../src/use-case/room/create-room-use-case';
import { CreateUserUseCase } from '../../../src/use-case/user/create-user-use-case';

describe('Create room participants use case tests', () => {
  const prismaClient = new PrismaClient();

  const userRepository = new PrismaUserRepository();
  const roomRepository = new PrismaRoomRepository();
  const roomParticipantRepository = new PrismaRoomParticipantRepository();

  const createUserUseCase = new CreateUserUseCase(userRepository);
  const createRoomUseCase = new CreateRoomUseCase(roomRepository);
  const createRoomParticipantUseCase = new CreateRoomParticipantUseCase(
    roomParticipantRepository,
    roomRepository,
  );

  beforeAll(async () => {
    await prismaClient.roomParticipant.deleteMany();
    await prismaClient.room.deleteMany();
    await prismaClient.user.deleteMany();
  });

  it('Should return new room participants', async () => {
    const userData = {
      username: 'a',
      email: 'a@gmail',
      password: '123456',
    };

    const roomData = {
      name: 'a',
    };

    const createUserResponse = await createUserUseCase.perform(userData);
    const createRoomResponse = await createRoomUseCase.perform(roomData.name);

    const roomParticipantData = {
      roomId: createRoomResponse.value.roomId,
      userId: createUserResponse.value.id,
    };

    const createRoomParticipantResponse =
      await createRoomParticipantUseCase.perform(
        roomParticipantData.roomId,
        roomParticipantData.userId,
      );

    expect(createRoomParticipantResponse.isSuccess()).toEqual(true);
    expect(createRoomParticipantResponse.value).toEqual(roomParticipantData);

    await prismaClient.roomParticipant.deleteMany();
    await prismaClient.room.deleteMany();
    await prismaClient.user.deleteMany();
  });

  it('Should return error message', async () => {
    const userData = {
      username: 'a',
      email: 'a@gmail',
      password: '123456',
    };

    const createUserResponse = await createUserUseCase.perform(userData);

    const roomParticipantData = {
      roomId: 'invalidRoomId',
      userId: createUserResponse.value.id,
    };

    const createRoomParticipantResponse =
      await createRoomParticipantUseCase.perform(
        roomParticipantData.roomId,
        roomParticipantData.userId,
      );

    expect(createRoomParticipantResponse.isError()).toEqual(true);
    expect(createRoomParticipantResponse.value).toEqual('Room not found');

    await prismaClient.user.deleteMany();
  });

  it('Should return error message', async () => {
    const userData = {
      username: 'a',
      email: 'a@gmail.com',
      password: '123456',
    };

    const createUserResponse = await createUserUseCase.perform(userData);

    const roomParticipantData = {
      roomId: '',
      userId: createUserResponse.value.id,
    };

    const createRoomParticipantResponse =
      await createRoomParticipantUseCase.perform(
        roomParticipantData.roomId,
        roomParticipantData.userId,
      );

    expect(createRoomParticipantResponse.isError()).toEqual(true);
    expect(createRoomParticipantResponse.value).toEqual(
      'RoomId should not be empty',
    );

    await prismaClient.user.deleteMany();
  });
});
