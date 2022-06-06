import { DeleteRoomUseCase } from '../../../use-case/room/delete-room-use-case';
import { badRequest, notFound, ok } from '../respose/http-responses';

export class DeleteRoomController {
  private deleteRoomUseCase: DeleteRoomUseCase;

  constructor(deleteRoomUseCase: DeleteRoomUseCase) {
    this.deleteRoomUseCase = deleteRoomUseCase;
  }

  public async perform(roomId: string) {
    const response = await this.deleteRoomUseCase.perform(roomId);

    if (response.isError()) {
      if (response.value === 'Room not found') return notFound(response.value);

      return badRequest(response.value);
    }

    return ok(response.value);
  }
}
