import { DeleteRoomUseCase } from '../../../use-case/room/delete-room-use-case';
import { notFound, ok } from '../respose/http-responses';

export class DeleteRoomController {
  private deleteRoomUseCase: DeleteRoomUseCase;

  constructor(deleteRoomUseCase: DeleteRoomUseCase) {
    this.deleteRoomUseCase = deleteRoomUseCase;
  }

  public async perform(roomId: string) {
    const response = await this.deleteRoomUseCase.perform(roomId);

    if (response.isError()) return notFound(response.value);

    return ok(response.value);
  }
}
