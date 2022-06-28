import { EditRoomUseCase } from '../../../src/use-case/room/edit-room-use-case';
import { FakeRoomRepository } from '../../util/fake-repository/fake-room-repository';

describe('Edit room use case tests', () => {
  const roomRepository = new FakeRoomRepository();
  const editRoomUseCase = new EditRoomUseCase(roomRepository);

  it('Should edit room', async () => {
    const editRoomData = {
      name: 'b',
    };

    jest.spyOn(roomRepository, 'findById').mockReturnValue(
      Promise.resolve({
        roomId: 'roomId',
        name: editRoomData.name,
      }),
    );

    jest
      .spyOn(roomRepository, 'edit')
      .mockReturnValue(Promise.resolve({ name: editRoomData.name }));

    const editRoomResponse = await editRoomUseCase.perform(
      'roomId',
      editRoomData.name,
    );

    expect(editRoomResponse.isSuccess()).toEqual(true);
    expect(editRoomResponse.value).toEqual(editRoomData);
  });

  it('Should return error message', async () => {
    const editRoomData = {
      name: 'b',
    };

    jest.spyOn(roomRepository, 'findById').mockReturnValue(
      Promise.resolve({
        roomId: undefined,
        name: undefined,
      }),
    );

    const editRoomResponse = await editRoomUseCase.perform(
      'invalidRoomId',
      editRoomData.name,
    );

    expect(editRoomResponse.isError()).toEqual(true);
    expect(editRoomResponse.value).toEqual('Room not found');
  });

  it('Should return error message', async () => {
    const editRoomData = {
      name: '',
    };

    jest.spyOn(roomRepository, 'findById').mockReturnValue(
      Promise.resolve({
        roomId: 'roomId',
        name: 'roomName',
      }),
    );

    const editRoomResponse = await editRoomUseCase.perform(
      'roomId',
      editRoomData.name,
    );

    expect(editRoomResponse.isError()).toEqual(true);
    expect(editRoomResponse.value).toEqual('Name should not be empty');
  });
});
