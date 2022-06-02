import { Room } from '../../domain/room/room';
import { RoomRepositoryInterface } from '../../infra/repositories/room-repository-interface';
import { error, success } from '../../shared/response';

export class EditRoomUseCase {
  private roomRepository: RoomRepositoryInterface;

  constructor(roomRepository: RoomRepositoryInterface) {
    this.roomRepository = roomRepository;
  }

  public async perform(roomId: string, name: string) {
    const roomOrError = Room.create(name);

    if (roomOrError.isError()) return error(roomOrError.value);

    const response = await this.roomRepository.edit(roomId, name);

    return success({
      name: response.name,
    });
  }
}
