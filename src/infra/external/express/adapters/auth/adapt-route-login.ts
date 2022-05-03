import { Request, Response } from 'express';
import { makeLoginController } from '../../../../controllers/factories/auth/make-login-controller';

export function adaptRouteLogin() {
  return async (req: Request, res: Response) => {
    const authData = {
      username: req.body.username,
      password: req.body.password,
    };

    const loginController = makeLoginController();

    const response = await loginController.perform(authData);

    return res.status(response.status).json(response.value);
  };
}
