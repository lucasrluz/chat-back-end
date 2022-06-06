import { RoomRepositoryInterface } from '../../infra/repositories/room-repository-interface';
import { error, success } from '../../shared/response';

export class DeleteRoomUseCase {
  private roomRepository: RoomRepositoryInterface;

  constructor(roomRepository: RoomRepositoryInterface) {
    this.roomRepository = roomRepository;
  }

  public async perform(roomId: string) {
    const roomOrEmpty = await this.roomRepository.findById(roomId);

    if (!roomOrEmpty.roomId) return error('Room not found');

    await this.roomRepository.deleteById(roomId);

    return success();
  }
}
