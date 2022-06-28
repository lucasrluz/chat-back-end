import { RoomRepositoryInterface } from '../../../src/infra/repositories/room-repository-interface';

export class FakeRoomRepository implements RoomRepositoryInterface {
  create(name: string): Promise<{ roomId: string; name: string }> {
    name;
    return Promise.resolve({
      roomId: '',
      name: '',
    });
  }

  findById(
    roomId: string,
  ): Promise<{ roomId: string | undefined; name: string | undefined }> {
    roomId;
    return Promise.resolve({
      roomId: '',
      name: '',
    });
  }

  edit(roomId: string, name: string): Promise<{ name: string }> {
    roomId;
    name;
    return Promise.resolve({
      name: '',
    });
  }

  deleteById(roomId: string): Promise<void> {
    roomId;
    return Promise.resolve();
  }
}
