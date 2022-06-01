import { Room } from '../../domain/room/room';
import { RoomRepositoryInterface } from '../../infra/repositories/room-repository-interface';
import { error, success } from '../../shared/response';

export class CreateRoomUseCase {
  private roomRepository: RoomRepositoryInterface;

  constructor(roomRepository: RoomRepositoryInterface) {
    this.roomRepository = roomRepository;
  }

  public async perform(name: string) {
    const roomOrError = Room.create(name);

    if (roomOrError.isError()) return error(roomOrError.value);

    const createRoomResponse = await this.roomRepository.create(name);

    return success({ name: createRoomResponse.name });
  }
}
