import { RoomMessage } from '../../domain/room-message/room-message';
import { RoomMessageRepositoryInterface } from '../../infra/repositories/room-message-repository-interface';
import { RoomRepositoryInterface } from '../../infra/repositories/room-repository-interface';
import { error, success } from '../../shared/response';

interface RoomMessageData {
  content: string;
  userId: string;
  roomId: string;
}

export class CreateRoomMessageUseCase {
  private roomMessageRepository: RoomMessageRepositoryInterface;
  private roomRepository: RoomRepositoryInterface;

  constructor(
    roomMessageRepository: RoomMessageRepositoryInterface,
    roomRepository: RoomRepositoryInterface,
  ) {
    this.roomMessageRepository = roomMessageRepository;
    this.roomRepository = roomRepository;
  }

  public async perform(roomMessageData: RoomMessageData) {
    const successOrError = RoomMessage.create(
      roomMessageData.content,
      roomMessageData.userId,
      roomMessageData.roomId,
    );

    if (successOrError.isError()) return error(successOrError.value);

    const roomOrEmpty = await this.roomRepository.findById(
      roomMessageData.roomId,
    );

    if (!roomOrEmpty.roomId) return error('Room not found');

    const response = await this.roomMessageRepository.create(roomMessageData);

    return success({ roomMessageId: response.roomMessageId });
  }
}
