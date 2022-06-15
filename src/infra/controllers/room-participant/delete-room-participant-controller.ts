import { DeleteRoomParticipantUseCase } from '../../../use-case/room-participant/delete-room-participant-use-case';
import { noContent, notFound } from '../respose/http-responses';

export class DeleteRoomParticipantController {
  private deleteRoomParticipantUseCase: DeleteRoomParticipantUseCase;

  constructor(deleteRoomParticipantUseCase: DeleteRoomParticipantUseCase) {
    this.deleteRoomParticipantUseCase = deleteRoomParticipantUseCase;
  }

  public async perform(roomParticipantId: string, roomId: string) {
    const response = await this.deleteRoomParticipantUseCase.perform(
      roomParticipantId,
      roomId,
    );

    if (response.isError()) return notFound(response.value);

    return noContent();
  }
}
