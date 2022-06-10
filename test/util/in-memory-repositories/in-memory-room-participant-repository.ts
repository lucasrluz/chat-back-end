import { RoomParticipantRepositoryInterface } from '../../../src/infra/repositories/room-participant-repository-interface';

interface roomParticipant {
  roomId: string;
  userId: string;
}

export class InMemoryRoomParticipantRepository
  implements RoomParticipantRepositoryInterface
{
  public roomParticipant: roomParticipant[] = [];

  public async create(roomId: string, userId: string) {
    this.roomParticipant.push({ roomId, userId });

    return {
      roomId,
      userId,
    };
  }

  public async findByRoomId(roomId: string) {
    const index = this.roomParticipant.findIndex(
      (roomParticipant) => roomParticipant.roomId === roomId,
    );

    const roomParticipant = this.roomParticipant[index];

    return {
      roomId: roomParticipant.roomId,
      userId: roomParticipant.userId,
    };
  }

  public async deleteMany() {
    this.roomParticipant = [];
  }
}
