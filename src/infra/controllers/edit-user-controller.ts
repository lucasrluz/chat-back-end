import { EditUserUseCase } from '../../use-case/user/edit-user-use-case';
import { badRequest, notFound, ok } from './respose/http-responses';

interface EditUserData {
  userId: string;
  username: string;
  password: string;
}

export class EditUserController {
  private editUserUseCase: EditUserUseCase;

  constructor(editUserUseCase: EditUserUseCase) {
    this.editUserUseCase = editUserUseCase;
  }

  public async perform(editUserData: EditUserData) {
    const response = await this.editUserUseCase.perform(editUserData);

    if (response.isError()) {
      if (response.value === 'User not found') return notFound(response.value);

      return badRequest(response.value);
    }

    return ok(response.value);
  }
}
