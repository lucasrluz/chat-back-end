import { RoomParticipantRepositoryInterface } from '../../infra/repositories/room-participant-repository-interface';
import { error, success } from '../../shared/response';

export class DeleteRoomParticipantUseCase {
  private roomParticipantRepository: RoomParticipantRepositoryInterface;

  constructor(roomParticipantRepository: RoomParticipantRepositoryInterface) {
    this.roomParticipantRepository = roomParticipantRepository;
  }

  public async perform(roomParticipantId: string, roomId: string) {
    const roomParticipantOrEmpty =
      await this.roomParticipantRepository.findByRoomParticipantIdAndRoomId(
        roomParticipantId,
        roomId,
      );

    if (!roomParticipantOrEmpty.roomId)
      return error('Room participant not found');

    await this.roomParticipantRepository.deleteByRoomParticipantId(
      roomParticipantId,
    );

    return success();
  }
}
