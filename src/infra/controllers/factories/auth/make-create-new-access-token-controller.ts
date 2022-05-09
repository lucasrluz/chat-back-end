import { CreateNewAccessTokenUseCase } from '../../../../use-case/auth/create-new-access-token-use-case';
import { CreateNewAccessTokenController } from '../../auth/create-new-access-token-controller';

export function makeCreateNewAccessTokenController() {
  const createNewAccessTokenUseCase = new CreateNewAccessTokenUseCase();
  const createNewAccessTokenController = new CreateNewAccessTokenController(
    createNewAccessTokenUseCase,
  );

  return createNewAccessTokenController;
}
