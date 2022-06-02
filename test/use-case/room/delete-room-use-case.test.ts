import { CreateRoomUseCase } from '../../../src/use-case/room/create-room-use-case';
import { DeleteRoomUseCase } from '../../../src/use-case/room/delete-room-use-case';
import { InMemoryRoomRepository } from '../../util/repositories/in-memory-room-repository';
import { InMemoryUserRepository } from '../../util/repositories/in-memory-user-repository';

describe('Delete room use case', () => {
  const roomRepository = new InMemoryRoomRepository();
  const userRepository = new InMemoryUserRepository();

  const createRoomUseCase = new CreateRoomUseCase(roomRepository);
  const deleteRoomUseCase = new DeleteRoomUseCase(roomRepository);

  it('Should delete room', async () => {
    const roomData = {
      name: 'a',
    };

    const createRoomResponse = await createRoomUseCase.perform(roomData.name);
    const deleteRoomResponse = await deleteRoomUseCase.perform(
      createRoomResponse.value.roomId,
    );

    expect(deleteRoomResponse.isSuccess()).toEqual(true);

    userRepository.deleteMany();
  });
});
