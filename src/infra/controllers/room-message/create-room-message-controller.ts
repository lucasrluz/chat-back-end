import { CreateRoomMessageUseCase } from '../../../use-case/room-messages/create-room-message-use-case';
import { badRequest, created, notFound } from '../respose/http-responses';

interface RoomMessageData {
  content: string;
  userId: string;
  roomId: string;
}

export class CreateRoomMessageController {
  private createRoomMessageUseCase: CreateRoomMessageUseCase;

  constructor(createRoomMessageUseCase: CreateRoomMessageUseCase) {
    this.createRoomMessageUseCase = createRoomMessageUseCase;
  }

  async perform(roomMessageData: RoomMessageData) {
    const response = await this.createRoomMessageUseCase.perform(
      roomMessageData,
    );

    if (response.isError()) {
      if (
        response.value === 'User not found' ||
        response.value === 'Room not found'
      )
        return notFound(response.value);

      return badRequest(response.value);
    }

    return created(response.value);
  }
}
