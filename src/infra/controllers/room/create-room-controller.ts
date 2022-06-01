import { CreateRoomUseCase } from '../../../use-case/room/create-room-use-case';
import { badRequest, created } from '../respose/http-responses';

export class CreateRoomController {
  private createRoomUseCase: CreateRoomUseCase;

  constructor(createRoomUseCase: CreateRoomUseCase) {
    this.createRoomUseCase = createRoomUseCase;
  }

  public async create(name: string) {
    const response = await this.createRoomUseCase.perform(name);

    if (response.isError()) return badRequest(response.value);

    return created(response.value);
  }
}
