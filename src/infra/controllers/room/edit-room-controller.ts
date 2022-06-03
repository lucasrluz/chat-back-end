import { EditRoomUseCase } from '../../../use-case/room/edit-room-use-case';
import { badRequest, ok } from '../respose/http-responses';

export class EditRoomController {
  private editRoomUseCase: EditRoomUseCase;

  constructor(editRoomUseCase: EditRoomUseCase) {
    this.editRoomUseCase = editRoomUseCase;
  }

  public async perform(roomId: string, name: string) {
    const response = await this.editRoomUseCase.perform(roomId, name);

    if (response.isError()) return badRequest(response.value);

    return ok(response.value);
  }
}
