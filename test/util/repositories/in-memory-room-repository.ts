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

  public async edit(roomId: string, name: string) {
    const index = this.rooms.findIndex((room) => room.roomId === roomId);

    this.rooms[index].name = name;

    return {
      name: name,
    };
  }
}
