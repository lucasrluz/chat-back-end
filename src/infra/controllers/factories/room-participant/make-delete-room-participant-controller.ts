import { DeleteRoomParticipantUseCase } from '../../../../use-case/room-participant/delete-room-participant-use-case';
import { PrismaRoomParticipantRepository } from '../../../external/prisma/repositories/prisma-room-participant-repository';
import { DeleteRoomParticipantController } from '../../room-participant/delete-room-participant-controller';

export function makeDeleteRoomParticipantController() {
  const roomParticipantRepository = new PrismaRoomParticipantRepository();
  const deleteRoomParticipantUseCase = new DeleteRoomParticipantUseCase(
    roomParticipantRepository,
  );
  const deleteRoomParticipantController = new DeleteRoomParticipantController(
    deleteRoomParticipantUseCase,
  );

  return deleteRoomParticipantController;
}
