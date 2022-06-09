import { CreateRoomParticipantUseCase } from '../../../use-case/room-participants/create-room-participant-use-case';
import { badRequest, created, notFound } from '../respose/http-responses';

export class CreateRoomParticipantsController {
  private createRoomParticipantsUseCase: CreateRoomParticipantUseCase;

  constructor(createRoomParticipantsUseCase: CreateRoomParticipantUseCase) {
    this.createRoomParticipantsUseCase = createRoomParticipantsUseCase;
  }

  public async perform(roomId: string, userId: string) {
    const response = await this.createRoomParticipantsUseCase.perform(
      roomId,
      userId,
    );

    if (response.isError()) {
      if (response.value === 'Room not found') return notFound(response.value);

      return badRequest(response.value);
    }

    return created(response.value);
  }
}
