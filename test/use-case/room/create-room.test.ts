import { CreateRoomUseCase } from '../../../src/use-case/room/create-room-use-case';
import { InMemoryRoomRepository } from '../../util/repositories/in-memory-room-repository';

describe('Create room use case tests', () => {
  const roomRepository = new InMemoryRoomRepository();
  const createRoomUseCase = new CreateRoomUseCase(roomRepository);
  it('Should return new room', async () => {
    const roomData = {
      name: 'a',
    };

    const response = await createRoomUseCase.perform(roomData.name);

    expect(response.isSuccess()).toEqual(true);
    expect(response.value.name).toEqual(roomData.name);
  });
});
