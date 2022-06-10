import { Request, Response } from 'express';
import { makeCreateRoomParticipantController } from '../../../../../controllers/factories/room-participant/make-create-room-participant-controller';

export function createRoomParticipantAdaptRoute() {
  return async (req: Request, res: Response) => {
    const roomId = req.params.room_id;
    const userId = req.params.user_id;

    const createRoomParticipantController =
      makeCreateRoomParticipantController();

    const response = await createRoomParticipantController.perform(
      roomId,
      userId,
    );

    return res.status(response.status).json(response.value);
  };
}
