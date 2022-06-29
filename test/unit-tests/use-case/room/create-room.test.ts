import { CreateRoomUseCase } from '../../../../src/use-case/room/create-room-use-case';
import { FakeRoomRepository } from '../../../util/fake-repository/fake-room-repository';

describe('Create room use case tests', () => {
  const roomRepository = new FakeRoomRepository();
  const createRoomUseCase = new CreateRoomUseCase(roomRepository);

  it('Should return new room', async () => {
    const roomData = {
      name: 'a',
    };

    jest
      .spyOn(roomRepository, 'create')
      .mockReturnValue(
        Promise.resolve({ roomId: 'roomId', name: roomData.name }),
      );

    const response = await createRoomUseCase.perform(roomData.name);

    expect(response.isSuccess()).toEqual(true);
    expect(response.value.name).toEqual(roomData.name);
  });

  it('Should return error message', async () => {
    const roomData = {
      name: '',
    };

    const response = await createRoomUseCase.perform(roomData.name);

    expect(response.isError()).toEqual(true);
    expect(response.value).toEqual('Name should not be empty');
  });
});
