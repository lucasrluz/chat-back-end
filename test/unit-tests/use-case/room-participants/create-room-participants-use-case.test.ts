import { CreateRoomParticipantUseCase } from '../../../../src/use-case/room-participant/create-room-participant-use-case';
import {
  RoomParticipantWithEmptyRoomId,
  ValidRoomParticipant,
} from '../../../util/data/room-participant-data';
import { FakeRoomParticipantRepository } from '../../../util/fake-repository/fake-room-participant-repository';
import { FakeRoomRepository } from '../../../util/fake-repository/fake-room-repository';

describe('Create room participants use case tests', () => {
  const roomParticipantRepository = new FakeRoomParticipantRepository();
  const roomRepository = new FakeRoomRepository();

  const createRoomParticipantUseCase = new CreateRoomParticipantUseCase(
    roomParticipantRepository,
    roomRepository,
  );

  it('Should return new room participants', async () => {
    const roomParticipantData = new ValidRoomParticipant();

    jest
      .spyOn(roomRepository, 'findById')
      .mockReturnValue(Promise.resolve({ roomId: 'roomId', name: 'roomName' }));

    jest
      .spyOn(roomParticipantRepository, 'create')
      .mockReturnValue(Promise.resolve({ roomId: 'roomId', userId: 'userId' }));

    const createRoomParticipantResponse =
      await createRoomParticipantUseCase.perform(
        roomParticipantData.roomId,
        roomParticipantData.userId,
      );

    expect(createRoomParticipantResponse.isSuccess()).toEqual(true);
    expect(createRoomParticipantResponse.value).toEqual(roomParticipantData);
  });

  it('Should return error message', async () => {
    const roomParticipantData = new ValidRoomParticipant();

    jest
      .spyOn(roomRepository, 'findById')
      .mockReturnValue(Promise.resolve({ roomId: undefined, name: undefined }));

    const createRoomParticipantResponse =
      await createRoomParticipantUseCase.perform(
        roomParticipantData.roomId,
        roomParticipantData.userId,
      );

    expect(createRoomParticipantResponse.isError()).toEqual(true);
    expect(createRoomParticipantResponse.value).toEqual('Room not found');
  });

  it('Should return error message', async () => {
    const roomParticipantData = new RoomParticipantWithEmptyRoomId();

    const createRoomParticipantResponse =
      await createRoomParticipantUseCase.perform(
        roomParticipantData.roomId,
        roomParticipantData.userId,
      );

    expect(createRoomParticipantResponse.isError()).toEqual(true);
    expect(createRoomParticipantResponse.value).toEqual(
      'RoomId should not be empty',
    );
  });
});
