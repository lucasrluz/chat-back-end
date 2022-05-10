import { Request, Response } from 'express';
import { makeDeleteUserController } from '../../../../../controllers/factories/user/make-delete-user-controller';

export function deleteUserAdaptRoute() {
  return async (req: Request, res: Response) => {
    const userId = req.params.user_id;

    const deleteUserController = await makeDeleteUserController();

    const response = await deleteUserController.perform(userId);

    return res.status(response.status).json(response.value);
  };
}
