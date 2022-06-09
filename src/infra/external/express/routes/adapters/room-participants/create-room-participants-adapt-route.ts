import { Request, Response } from 'express';
import { makeCreateRoomParticipantsController } from '../../../../../controllers/factories/room-participants/make-create-room-participants-controller';

export function createRoomParticipantsAdaptRoute() {
  return async (req: Request, res: Response) => {
    const roomId = req.params.room_id;
    const userId = req.params.user_id;

    const createRoomParticipantsController =
      makeCreateRoomParticipantsController();

    const response = await createRoomParticipantsController.perform(
      roomId,
      userId,
    );

    return res.status(response.status).json(response.value);
  };
}
