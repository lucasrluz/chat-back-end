import { Request, Response } from 'express';
import { makeCreateUserController } from '../../../controllers/factories/make-create-user-controller';

export function createUserAdaptRoute() {
  return async (req: Request, res: Response) => {
    const user = req.body;

    const createUserController = makeCreateUserController();

    const response = await createUserController.perform(user);

    return res.status(response.status).json(response.value);
  };
}
