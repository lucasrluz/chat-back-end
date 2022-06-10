import { CreateRoomParticipantUseCase } from '../../../use-case/room-participant/create-room-participant-use-case';
import { badRequest, created, notFound } from '../respose/http-responses';

export class CreateRoomParticipantController {
  private createRoomParticipantUseCase: CreateRoomParticipantUseCase;

  constructor(createRoomParticipantUseCase: CreateRoomParticipantUseCase) {
    this.createRoomParticipantUseCase = createRoomParticipantUseCase;
  }

  public async perform(roomId: string, userId: string) {
    const response = await this.createRoomParticipantUseCase.perform(
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
