import { DeleteRoomParticipantUseCase } from '../../../../src/use-case/room-participant/delete-room-participant-use-case';
import { CreateRoomUseCase } from '../../../../src/use-case/room/create-room-use-case';
import { FakeRoomParticipantRepository } from '../../../util/fake-repository/fake-room-participant-repository';
import { FakeRoomRepository } from '../../../util/fake-repository/fake-room-repository';

describe('Delete room participant use case tests', () => {
  const roomRepository = new FakeRoomRepository();
  const roomParticipantRepository = new FakeRoomParticipantRepository();

  const createRoomUseCase = new CreateRoomUseCase(roomRepository);
  const deleteRoomParticipantUseCase = new DeleteRoomParticipantUseCase(
    roomParticipantRepository,
  );

  it('Should delete room participant', async () => {
    const roomParticipantData = {
      roomId: 'roomId',
      userId: 'userId',
    };

    jest
      .spyOn(roomParticipantRepository, 'findByRoomParticipantIdAndRoomId')
      .mockReturnValue(Promise.resolve({ roomId: 'roomId', userId: 'userId' }));

    jest
      .spyOn(roomParticipantRepository, 'deleteByRoomParticipantId')
      .mockReturnValue(Promise.resolve());

    const deleteRoomParticipantResponse =
      await deleteRoomParticipantUseCase.perform(
        roomParticipantData.userId,
        roomParticipantData.roomId,
      );

    expect(deleteRoomParticipantResponse.isSuccess()).toEqual(true);
  });

  it('Should return error message', async () => {
    const roomParticipantData = {
      roomId: 'roomId',
      userId: 'userId',
    };

    jest
      .spyOn(roomParticipantRepository, 'findByRoomParticipantIdAndRoomId')
      .mockReturnValue(
        Promise.resolve({ roomId: undefined, userId: undefined }),
      );

    const deleteRoomParticipantResponse =
      await deleteRoomParticipantUseCase.perform(
        'invalidRoomParticipantId',
        roomParticipantData.roomId,
      );

    expect(deleteRoomParticipantResponse.isError()).toEqual(true);
    expect(deleteRoomParticipantResponse.value).toEqual(
      'Room participant not found',
    );
  });
});
