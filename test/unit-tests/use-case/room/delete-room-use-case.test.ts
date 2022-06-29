import { DeleteRoomUseCase } from '../../../../src/use-case/room/delete-room-use-case';
import { FakeRoomRepository } from '../../../util/fake-repository/fake-room-repository';

describe('Delete room use case', () => {
  const roomRepository = new FakeRoomRepository();

  const deleteRoomUseCase = new DeleteRoomUseCase(roomRepository);

  it('Should delete room', async () => {
    jest
      .spyOn(roomRepository, 'findById')
      .mockReturnValue(Promise.resolve({ roomId: 'roomId', name: 'roomName' }));
    const deleteRoomResponse = await deleteRoomUseCase.perform('roomId');

    expect(deleteRoomResponse.isSuccess()).toEqual(true);
  });

  it('Should return error', async () => {
    jest
      .spyOn(roomRepository, 'findById')
      .mockReturnValue(Promise.resolve({ roomId: undefined, name: undefined }));

    const deleteRoomResponse = await deleteRoomUseCase.perform('invalidRoomId');

    expect(deleteRoomResponse.isError()).toEqual(true);
    expect(deleteRoomResponse.value).toEqual('Room not found');
  });
});
