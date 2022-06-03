import { Request, Response } from 'express';
import { makeEditRoomController } from '../../../../../controllers/factories/room/make-edit-room-controller';

export function editRoomAdaptRoute() {
  return async (req: Request, res: Response) => {
    const roomId = req.params.room_id;

    const roomData = {
      name: req.body.name,
    };

    const editRoomController = makeEditRoomController();

    const response = await editRoomController.perform(roomId, roomData.name);

    return res.status(response.status).json(response.value);
  };
}
