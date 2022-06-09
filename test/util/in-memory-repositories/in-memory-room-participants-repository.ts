import { RoomParticipantsRepositoryInterface } from '../../../src/infra/repositories/room-participants-repository-interface';

interface roomParticipant {
  roomId: string;
  userId: string;
}

export class InMemoryRoomParticipantsRepository
  implements RoomParticipantsRepositoryInterface
{
  public roomParticipants: roomParticipant[] = [];

  public async create(roomId: string, userId: string) {
    this.roomParticipants.push({ roomId, userId });

    return {
      roomId,
      userId,
    };
  }

  public async findByRoomId(roomId: string) {
    const index = this.roomParticipants.findIndex(
      (roomParticipants) => roomParticipants.roomId === roomId,
    );

    const roomParticipant = this.roomParticipants[index];

    return {
      roomId: roomParticipant.roomId,
      userId: roomParticipant.userId,
    };
  }

  public async deleteMany() {
    this.roomParticipants = [];
  }
}
