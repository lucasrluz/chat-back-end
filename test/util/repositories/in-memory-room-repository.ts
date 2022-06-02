import { RoomRepositoryInterface } from '../../../src/infra/repositories/room-repository-interface';

interface RoomData {
  roomId: string;
  name: string;
}

export class InMemoryRoomRepository implements RoomRepositoryInterface {
  private rooms: RoomData[] = [];

  public async create(name: string) {
    const roomId = this.rooms.length + 1;

    this.rooms.push({ roomId: roomId.toString(), name: name });

    return { roomId: roomId.toString(), name: name };
  }
}
