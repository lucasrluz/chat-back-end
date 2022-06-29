import { CreateRoomMessageUseCase } from '../../../../src/use-case/room-messages/create-room-message-use-case';
import { FakeRoomMessageRepository } from '../../../util/fake-repository/fake-room-message-repository';
import { FakeRoomRepository } from '../../../util/fake-repository/fake-room-repository';
import { FakeUserRepository } from '../../../util/fake-repository/fake-user-repository';

describe('Create room message use case tests', () => {
  const userRepository = new FakeUserRepository();
  const roomRepository = new FakeRoomRepository();
  const roomMessageRepository = new FakeRoomMessageRepository();
  const createRoomMessageUseCase = new CreateRoomMessageUseCase(
    roomMessageRepository,
    roomRepository,
    userRepository,
  );

  it('Should create room message', async () => {
    const roomMessageData = {
      content: 'a',
      userId: 'userId',
      roomId: 'roomId',
    };

    jest.spyOn(userRepository, 'findById').mockReturnValue(
      Promise.resolve({
        id: 'userId',
        email: 'userEmail',
        password: 'userPassword',
        username: 'username',
      }),
    );

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
    const roomMessageData = {
      content: 'a',
      userId: 'userId',
      roomId: 'roomId',
    };

    jest.spyOn(userRepository, 'findById').mockReturnValue(
      Promise.resolve({
        id: undefined,
        email: undefined,
        password: undefined,
        username: undefined,
      }),
    );

    const createRoomMessageResponse = await createRoomMessageUseCase.perform(
      roomMessageData,
    );

    expect(createRoomMessageResponse.isError()).toEqual(true);
    expect(createRoomMessageResponse.value).toEqual('User not found');
  });

  it('Should return error message', async () => {
    const roomMessageData = {
      content: 'a',
      userId: 'userId',
      roomId: 'roomId',
    };

    jest.spyOn(userRepository, 'findById').mockReturnValue(
      Promise.resolve({
        id: 'userID',
        email: 'userEmail',
        password: 'userPassword',
        username: 'username',
      }),
    );

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
    const roomMessageData = {
      content: '',
      userId: '',
      roomId: '',
    };

    const createRoomMessageResponse = await createRoomMessageUseCase.perform(
      roomMessageData,
    );

    expect(createRoomMessageResponse.isError()).toEqual(true);
    expect(createRoomMessageResponse.value).toEqual(
      'Content should not be empty',
    );
  });
});
