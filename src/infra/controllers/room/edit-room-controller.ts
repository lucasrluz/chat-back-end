import { EditRoomUseCase } from '../../../use-case/room/edit-room-use-case';
import { badRequest, notFound, ok } from '../respose/http-responses';

export class EditRoomController {
  private editRoomUseCase: EditRoomUseCase;

  constructor(editRoomUseCase: EditRoomUseCase) {
    this.editRoomUseCase = editRoomUseCase;
  }

  public async perform(roomId: string, name: string) {
    const response = await this.editRoomUseCase.perform(roomId, name);

    if (response.isError()) {
      if (response.value === 'Room not found') return notFound(response.value);

      return badRequest(response.value);
    }

    return ok(response.value);
  }
}
