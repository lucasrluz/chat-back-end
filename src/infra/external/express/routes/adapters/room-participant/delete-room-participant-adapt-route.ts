import { Request, Response } from 'express';
import { makeDeleteRoomParticipantController } from '../../../../../controllers/factories/room-participant/make-delete-room-participant-controller';

export function deleteRoomParticipantAdaptRoute() {
  return async (req: Request, res: Response) => {
    const userId = req.params.user_id;
    const roomId = req.params.room_id;

    const deleteRoomParticipantController =
      makeDeleteRoomParticipantController();

    const response = await deleteRoomParticipantController.perform(
      userId,
      roomId,
    );

    return res.status(response.status).json(response.value);
  };
}
