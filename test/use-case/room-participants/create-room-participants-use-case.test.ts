import { CreateRoomParticipantUseCase } from '../../../src/use-case/room-participants/create-room-participant-use-case';
import { CreateRoomUseCase } from '../../../src/use-case/room/create-room-use-case';
import { CreateUserUseCase } from '../../../src/use-case/user/create-user-use-case';
import { InMemoryRoomParticipantsRepository } from '../../util/repositories/in-memory-room-participants-repository';
import { InMemoryRoomRepository } from '../../util/repositories/in-memory-room-repository';
import { InMemoryUserRepository } from '../../util/repositories/in-memory-user-repository';

describe('Create room participants use case tests', () => {
  const userRepository = new InMemoryUserRepository();
  const roomRepository = new InMemoryRoomRepository();
  const roomParticipantsRepository = new InMemoryRoomParticipantsRepository();

  const createUserUseCase = new CreateUserUseCase(userRepository);
  const createRoomUseCase = new CreateRoomUseCase(roomRepository);
  const createRoomParticipantsUseCase = new CreateRoomParticipantUseCase(
    roomParticipantsRepository,
    roomRepository,
  );

  beforeAll(async () => {
    await userRepository.deleteMany();
    await roomRepository.deleteMany();
    await roomParticipantsRepository.deleteMany();
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

    const roomParticipantsData = {
      roomId: createRoomResponse.value.roomId,
      userId: createUserResponse.value.id,
    };

    const createRoomParticipantsResponse =
      await createRoomParticipantsUseCase.perform(
        roomParticipantsData.roomId,
        roomParticipantsData.userId,
      );

    expect(createRoomParticipantsResponse.isSuccess()).toEqual(true);
    expect(createRoomParticipantsResponse.value).toEqual(roomParticipantsData);

    await roomParticipantsRepository.deleteMany();
    await roomRepository.deleteMany();
    await userRepository.deleteMany();
  });

  it('Should return error message', async () => {
    const userData = {
      username: 'a',
      email: 'a@gmail',
      password: '123456',
    };

    const createUserResponse = await createUserUseCase.perform(userData);

    const roomParticipantsData = {
      roomId: 'invalidRoomId',
      userId: createUserResponse.value.id,
    };

    const createRoomParticipantsResponse =
      await createRoomParticipantsUseCase.perform(
        roomParticipantsData.roomId,
        roomParticipantsData.userId,
      );

    expect(createRoomParticipantsResponse.isError()).toEqual(true);
    expect(createRoomParticipantsResponse.value).toEqual('Room not found');

    await userRepository.deleteMany();
  });
});
