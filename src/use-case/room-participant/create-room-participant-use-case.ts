import { RoomParticipant } from '../../domain/room-participant/room-participant';
import { RoomParticipantRepositoryInterface } from '../../infra/repositories/room-participant-repository-interface';
import { RoomRepositoryInterface } from '../../infra/repositories/room-repository-interface';
import { error, success } from '../../shared/response';

export class CreateRoomParticipantUseCase {
  private roomParticipantRepository: RoomParticipantRepositoryInterface;
  private roomRepository: RoomRepositoryInterface;

  constructor(
    roomParticipantsRepository: RoomParticipantRepositoryInterface,
    roomRepository: RoomRepositoryInterface,
  ) {
    this.roomParticipantRepository = roomParticipantsRepository;
    this.roomRepository = roomRepository;
  }

  public async perform(roomId: string, userId: string) {
    const roomParticipants = RoomParticipant.create(roomId, userId);

    if (roomParticipants.isError()) return error(roomParticipants.value);

    const roomOrEmpty = await this.roomRepository.findById(roomId);

    if (!roomOrEmpty.roomId) return error('Room not found');

    await this.roomParticipantRepository.create(roomId, userId);

    return success({ roomId, userId });
  }
}
