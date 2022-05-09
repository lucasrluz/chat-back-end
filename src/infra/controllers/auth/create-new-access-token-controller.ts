import { CreateNewAccessTokenUseCase } from '../../../use-case/auth/create-new-access-token-use-case';
import { badRequest, created } from '../respose/http-responses';

export class CreateNewAccessTokenController {
  private createNewAccessTokenUseCase: CreateNewAccessTokenUseCase;

  constructor(createNewAccessTokenUseCase: CreateNewAccessTokenUseCase) {
    this.createNewAccessTokenUseCase = createNewAccessTokenUseCase;
  }

  public async perform(refreshToken: string, userId: string) {
    const response = await this.createNewAccessTokenUseCase.perform(
      refreshToken,
      userId,
    );

    if (response.isError()) return badRequest(response.value);

    return created(response.value);
  }
}
