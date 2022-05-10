import { Request, Response } from 'express';
import { makeEditUserController } from '../../../../../controllers/factories/user/make-edit-user-controller';

export function editUserAdaptRoute() {
  return async (req: Request, res: Response) => {
    const editUserData = {
      userId: req.params.user_id,
      username: req.body.username,
      password: req.body.password,
    };

    const editUserController = makeEditUserController();

    const response = await editUserController.perform(editUserData);

    return res.status(response.status).json(response.value);
  };
}
