import { CreateRoomUseCase } from '../../../src/use-case/room/create-room-use-case';
import { DeleteRoomUseCase } from '../../../src/use-case/room/delete-room-use-case';
import { InMemoryRoomRepository } from '../../util/repositories/in-memory-room-repository';

describe('Delete room use case', () => {
  const roomRepository = new InMemoryRoomRepository();

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
  });

  it('Should return error', async () => {
    const deleteRoomResponse = await deleteRoomUseCase.perform('invalidRoomId');

    expect(deleteRoomResponse.isError()).toEqual(true);
    expect(deleteRoomResponse.value).toEqual('Room not found');
  });
});
