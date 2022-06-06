import { Request, Response } from 'express';
import { makeDeleteRoomController } from '../../../../../controllers/factories/room/make-delete-room-controller';

export function deleteRoomAdaptRoute() {
  return async (req: Request, res: Response) => {
    const roomId = req.params.room_id;

    const deleteRoomController = makeDeleteRoomController();

    const response = await deleteRoomController.perform(roomId);

    return res.status(response.status).json(response.value);
  };
}
