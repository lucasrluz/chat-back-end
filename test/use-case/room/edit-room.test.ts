import { CreateRoomUseCase } from '../../../src/use-case/room/create-room-use-case';
import { EditRoomUseCase } from '../../../src/use-case/room/edit-room-use-case';
import { InMemoryRoomRepository } from '../../util/repositories/in-memory-room-repository';

describe('Edit room use case tests', () => {
  const roomRepository = new InMemoryRoomRepository();
  const createRoomUseCase = new CreateRoomUseCase(roomRepository);
  const editRoomUseCase = new EditRoomUseCase(roomRepository);

  it('Should edit room', async () => {
    const roomData = {
      name: 'a',
    };

    const editRoomData = {
      name: 'b',
    };

    const createRoomResponse = await createRoomUseCase.perform(roomData.name);

    const editRoomResponse = await editRoomUseCase.perform(
      createRoomResponse.value.roomId,
      editRoomData.name,
    );

    expect(editRoomResponse.isSuccess()).toEqual(true);
    expect(editRoomResponse.value).toEqual(editRoomData);
  });

  it('Should return error message', async () => {
    const editRoomData = {
      name: 'b',
    };

    const editRoomResponse = await editRoomUseCase.perform(
      'invalidRoomId',
      editRoomData.name,
    );

    expect(editRoomResponse.isError()).toEqual(true);
    expect(editRoomResponse.value).toEqual('Room not found');
  });
});
