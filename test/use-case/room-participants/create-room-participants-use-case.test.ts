import { CreateRoomParticipantUseCase } from '../../../src/use-case/room-participant/create-room-participant-use-case';
import { CreateRoomUseCase } from '../../../src/use-case/room/create-room-use-case';
import { CreateUserUseCase } from '../../../src/use-case/user/create-user-use-case';
import { InMemoryRoomParticipantRepository } from '../../util/in-memory-repositories/in-memory-room-participant-repository';
import { InMemoryRoomRepository } from '../../util/in-memory-repositories/in-memory-room-repository';
import { InMemoryUserRepository } from '../../util/in-memory-repositories/in-memory-user-repository';

describe('Create room participants use case tests', () => {
  const userRepository = new InMemoryUserRepository();
  const roomRepository = new InMemoryRoomRepository();
  const roomParticipantRepository = new InMemoryRoomParticipantRepository();

  const createUserUseCase = new CreateUserUseCase(userRepository);
  const createRoomUseCase = new CreateRoomUseCase(roomRepository);
  const createRoomParticipantUseCase = new CreateRoomParticipantUseCase(
    roomParticipantRepository,
    roomRepository,
  );

  beforeAll(async () => {
    await userRepository.deleteMany();
    await roomRepository.deleteMany();
    await roomParticipantRepository.deleteMany();
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

    await roomParticipantRepository.deleteMany();
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

    await userRepository.deleteMany();
  });
});
