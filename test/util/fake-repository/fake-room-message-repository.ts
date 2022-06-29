import { RoomMessageRepositoryInterface } from '../../../src/infra/repositories/room-message-repository-interface';

interface RoomMessageData {
  content: string;
  userId: string;
  roomId: string;
}

export class FakeRoomMessageRepository
  implements RoomMessageRepositoryInterface
{
  create(roomMessageData: RoomMessageData): Promise<{ roomMessageId: string }> {
    roomMessageData;

    return Promise.resolve({
      roomMessageId: '',
    });
  }
}
