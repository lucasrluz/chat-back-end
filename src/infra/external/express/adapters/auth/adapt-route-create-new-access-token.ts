import { Request, Response } from 'express';
import { makeCreateNewAccessTokenController } from '../../../../controllers/factories/auth/make-create-new-access-token-controller';

export function adaptRouteCreateNewAccessToken() {
  return async (req: Request, res: Response) => {
    const refreshToken = req.body.refreshToken;
    const userId = req.params.user_id;

    const createNewAccessTokenController = makeCreateNewAccessTokenController();

    const response = await createNewAccessTokenController.perform(
      refreshToken,
      userId,
    );

    return res.status(response.status).json(response.value);
  };
}
