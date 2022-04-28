import { UserInterface } from '../../domain/user/interface/user-interface';
import { CreateUserUseCase } from '../../use-case/user/create-user-use-case';
import { badRequest, created } from './respose/http-responses';

export class CreateUserController {
  private createUserUseCase: CreateUserUseCase;

  constructor(createUserUseCase: CreateUserUseCase) {
    this.createUserUseCase = createUserUseCase;
  }

  public async perform(user: UserInterface) {
    const response = await this.createUserUseCase.perform(user);

    if (response.isError()) return badRequest(response.value);

    return created(response.value);
  }
}
