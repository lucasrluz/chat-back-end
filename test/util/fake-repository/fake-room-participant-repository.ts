import { RoomParticipantRepositoryInterface } from '../../../src/infra/repositories/room-participant-repository-interface';

export class FakeRoomParticipantRepository
  implements RoomParticipantRepositoryInterface
{
  create(
    roomId: string,
    userId: string,
  ): Promise<{ roomId: string; userId: string }> {
    roomId;
    userId;

    return Promise.resolve({
      roomId: '',
      userId: '',
    });
  }

  findByRoomId(
    roomId: string,
  ): Promise<{ roomId: string | undefined; userId: string | undefined }> {
    roomId;

    return Promise.resolve({ roomId: '', userId: '' });
  }

  findByRoomParticipantIdAndRoomId(
    roomParticipantId: string,
    roomId: string,
  ): Promise<{ roomId: string | undefined; userId: string | undefined }> {
    roomParticipantId;
    roomId;

    return Promise.resolve({
      roomId: '',
      userId: '',
    });
  }

  deleteByRoomParticipantId(roomParticipantId: string): Promise<void> {
    roomParticipantId;

    return Promise.resolve();
  }
}
