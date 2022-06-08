import { RoomParticipants } from '../../domain/room-participants/room-participants';
import { RoomParticipantsRepositoryInterface } from '../../infra/repositories/room-participants-repository-interface';
import { RoomRepositoryInterface } from '../../infra/repositories/room-repository-interface';
import { error, success } from '../../shared/response';

export class CreateRoomParticipantUseCase {
  private roomParticipantsRepository: RoomParticipantsRepositoryInterface;
  private roomRepository: RoomRepositoryInterface;

  constructor(
    roomParticipantsRepository: RoomParticipantsRepositoryInterface,
    roomRepository: RoomRepositoryInterface,
  ) {
    this.roomParticipantsRepository = roomParticipantsRepository;
    this.roomRepository = roomRepository;
  }

  public async perform(roomId: string, userId: string) {
    const roomParticipants = RoomParticipants.create(roomId, userId);

    if (roomParticipants.isError()) return error(roomParticipants.value);

    const roomOrEmpty = await this.roomRepository.findById(roomId);

    if (!roomOrEmpty.roomId) return error('Room not found');

    await this.roomParticipantsRepository.create(roomId, userId);

    return success({ roomId, userId });
  }
}
