import { Request, Response } from 'express';
import { makeCreateRoomController } from '../../../../../controllers/factories/room/make-create-room-controller';

export function createRoomAdaptRoute() {
  return async (req: Request, res: Response) => {
    const roomData = {
      name: req.body.name,
    };

    const createRoomController = makeCreateRoomController();

    const response = await createRoomController.create(roomData.name);

    return res.status(response.status).json(response.value);
  };
}
