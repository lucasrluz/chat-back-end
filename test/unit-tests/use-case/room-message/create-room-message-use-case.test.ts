import { CreateRoomMessageUseCase } from '../../../../src/use-case/room-messages/create-room-message-use-case';
import {
  RoomMessageWithEmptyContent,
  ValidRoomMessage,
} from '../../../util/data/room-message-data';
import { FakeRoomMessageRepository } from '../../../util/fake-repository/fake-room-message-repository';
import { FakeRoomRepository } from '../../../util/fake-repository/fake-room-repository';

describe('Create room message use case tests', () => {
  const roomRepository = new FakeRoomRepository();
  const roomMessageRepository = new FakeRoomMessageRepository();
  const createRoomMessageUseCase = new CreateRoomMessageUseCase(
    roomMessageRepository,
    roomRepository,
  );

  it('Should create room message', async () => {
    const roomMessageData = new ValidRoomMessage();

    jest
      .spyOn(roomRepository, 'findById')
      .mockReturnValue(Promise.resolve({ roomId: 'roomId', name: 'roomName' }));

    jest
      .spyOn(roomMessageRepository, 'create')
      .mockReturnValue(Promise.resolve({ roomMessageId: 'roomMessageId' }));

    const createRoomMessageResponse = await createRoomMessageUseCase.perform(
      roomMessageData,
    );

    expect(createRoomMessageResponse.isSuccess()).toEqual(true);
  });

  it('Should return error message', async () => {
    const roomMessageData = new ValidRoomMessage();

    jest.spyOn(roomRepository, 'findById').mockReturnValue(
      Promise.resolve({
        roomId: undefined,
        name: undefined,
      }),
    );

    const createRoomMessageResponse = await createRoomMessageUseCase.perform(
      roomMessageData,
    );

    expect(createRoomMessageResponse.isError()).toEqual(true);
    expect(createRoomMessageResponse.value).toEqual('Room not found');
  });

  it('Should return error message', async () => {
    const roomMessageData = new RoomMessageWithEmptyContent();

    const createRoomMessageResponse = await createRoomMessageUseCase.perform(
      roomMessageData,
    );

    expect(createRoomMessageResponse.isError()).toEqual(true);
    expect(createRoomMessageResponse.value).toEqual(
      'Content should not be empty',
    );
  });
});
