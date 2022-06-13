import { CreateRoomParticipantUseCase } from '../../../src/use-case/room-participant/create-room-participant-use-case';
import { DeleteRoomParticipantUseCase } from '../../../src/use-case/room-participant/delete-room-participant-use-case';
import { CreateRoomUseCase } from '../../../src/use-case/room/create-room-use-case';
import { CreateUserUseCase } from '../../../src/use-case/user/create-user-use-case';
import { InMemoryRoomParticipantRepository } from '../../util/in-memory-repositories/in-memory-room-participant-repository';
import { InMemoryRoomRepository } from '../../util/in-memory-repositories/in-memory-room-repository';
import { InMemoryUserRepository } from '../../util/in-memory-repositories/in-memory-user-repository';

describe('Delete room participant use case tests', () => {
  const userRepository = new InMemoryUserRepository();
  const roomRepository = new InMemoryRoomRepository();
  const roomParticipantRepository = new InMemoryRoomParticipantRepository();

  const createUserUseCase = new CreateUserUseCase(userRepository);
  const createRoomUseCase = new CreateRoomUseCase(roomRepository);
  const createRoomParticipantUseCase = new CreateRoomParticipantUseCase(
    roomParticipantRepository,
    roomRepository,
  );
  const deleteRoomParticipantUseCase = new DeleteRoomParticipantUseCase(
    roomParticipantRepository,
  );

  beforeAll(async () => {
    await roomParticipantRepository.deleteMany();
    await roomRepository.deleteMany();
    await userRepository.deleteMany();
  });

  it('Should delete room participant', async () => {
    const userData = {
      username: 'a',
      email: 'a@gmail.com',
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

    await createRoomParticipantUseCase.perform(
      roomParticipantData.roomId,
      roomParticipantData.userId,
    );

    const deleteRoomParticipantResponse =
      await deleteRoomParticipantUseCase.perform(
        roomParticipantData.userId,
        roomParticipantData.roomId,
      );

    expect(deleteRoomParticipantResponse.isSuccess()).toEqual(true);

    await roomRepository.deleteMany();
    await userRepository.deleteMany();
  });

  it('Should return error message', async () => {
    const userData = {
      username: 'a',
      email: 'a@gmail.com',
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

    await createRoomParticipantUseCase.perform(
      roomParticipantData.roomId,
      roomParticipantData.userId,
    );

    const deleteRoomParticipantResponse =
      await deleteRoomParticipantUseCase.perform(
        'invalidRoomParticipantId',
        roomParticipantData.roomId,
      );

    expect(deleteRoomParticipantResponse.isError()).toEqual(true);
    expect(deleteRoomParticipantResponse.value).toEqual(
      'Room participant not found',
    );

    await roomRepository.deleteMany();
    await userRepository.deleteMany();
  });
});
