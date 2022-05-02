import { DeleteUserUseCase } from '../../../use-case/user/delete-user-use-case';
import { notFound, ok } from '../respose/http-responses';

export class DeleteUserController {
  private deleteUserUseCase: DeleteUserUseCase;

  constructor(deleteUserUseCase: DeleteUserUseCase) {
    this.deleteUserUseCase = deleteUserUseCase;
  }

  public async perform(userId: string) {
    const response = await this.deleteUserUseCase.perform(userId);

    if (response.isError()) return notFound(response.value);

    return ok(response.value);
  }
}
