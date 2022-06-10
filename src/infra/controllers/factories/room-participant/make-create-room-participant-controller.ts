import { CreateRoomParticipantUseCase } from '../../../../use-case/room-participant/create-room-participant-use-case';
import { PrismaRoomParticipantRepository } from '../../../external/prisma/repositories/prisma-room-participant-repository';
import { PrismaRoomRepository } from '../../../external/prisma/repositories/prisma-room-repository';
import { CreateRoomParticipantController } from '../../room-participant/create-room-participant-controller';

export function makeCreateRoomParticipantController() {
  const roomParticipantRepository = new PrismaRoomParticipantRepository();
  const roomRepository = new PrismaRoomRepository();
  const createRoomParticipantUseCase = new CreateRoomParticipantUseCase(
    roomParticipantRepository,
    roomRepository,
  );
  const createRoomParticipantController = new CreateRoomParticipantController(
    createRoomParticipantUseCase,
  );

  return createRoomParticipantController;
}
