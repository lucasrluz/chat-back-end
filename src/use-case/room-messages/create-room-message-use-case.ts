import { RoomMessage } from '../../domain/room-message/room-message';
import { RoomMessageRepositoryInterface } from '../../infra/repositories/room-message-repository-interface';
import { RoomRepositoryInterface } from '../../infra/repositories/room-repository-interface';
import { UserRepositoryInterface } from '../../infra/repositories/user-repository-interface';
import { error, success } from '../../shared/response';

interface RoomMessageData {
  content: string;
  userId: string;
  roomId: string;
}

export class CreateRoomMessageUseCase {
  private roomMessageRepository: RoomMessageRepositoryInterface;
  private roomRepository: RoomRepositoryInterface;
  private userRepository: UserRepositoryInterface;

  constructor(
    roomMessageRepository: RoomMessageRepositoryInterface,
    roomRepository: RoomRepositoryInterface,
    userRepository: UserRepositoryInterface,
  ) {
    this.roomMessageRepository = roomMessageRepository;
    this.roomRepository = roomRepository;
    this.userRepository = userRepository;
  }

  public async perform(roomMessageData: RoomMessageData) {
    const successOrError = RoomMessage.create(
      roomMessageData.content,
      roomMessageData.userId,
      roomMessageData.roomId,
    );

    if (successOrError.isError()) return error(successOrError.value);

    const userOrEmpty = await this.userRepository.findById(
      roomMessageData.userId,
    );

    if (!userOrEmpty.id) return error('User not found');

    const roomOrEmpty = await this.roomRepository.findById(
      roomMessageData.roomId,
    );

    if (!roomOrEmpty.roomId) return error('Room not found');

    const response = await this.roomMessageRepository.create(roomMessageData);

    return success({ roomMessageId: response.roomMessageId });
  }
}
