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

  public async findByRoomParticipantIdAndRoomId(
    roomParticipantId: string,
    roomId: string,
  ) {
    const index = this.roomParticipant.findIndex(
      (roomParticipant) =>
        roomParticipant.roomId === roomId &&
        roomParticipant.userId === roomParticipantId,
    );

    if (index === -1)
      return {
        roomId: undefined,
        userId: undefined,
      };

    const response = await this.roomParticipant[index];

    return {
      roomId: response.roomId,
      userId: response.userId,
    };
  }

  public async deleteByRoomParticipantId(roomParticipantId: string) {
    const index = this.roomParticipant.findIndex(
      (roomParticipant) => roomParticipant.roomId === roomParticipantId,
    );

    this.roomParticipant.splice(index, 1);

    return;
  }

  public async deleteMany() {
    this.roomParticipant = [];
  }
}
