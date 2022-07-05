import { Request, Response } from 'express';
import { makeCreateRoomMessageController } from '../../../../../controllers/factories/room-message/make-create-room-message-controller';

export function createRoomMessageAdaptRoute() {
  return async (req: Request, res: Response) => {
    const roomMessageData = {
      content: req.body.content,
      userId: req.params.user_id,
      roomId: req.params.room_id,
    };

    const createRoomMessageController = makeCreateRoomMessageController();

    const response = await createRoomMessageController.perform(roomMessageData);

    return res.status(response.status).json(response.value);
  };
}
