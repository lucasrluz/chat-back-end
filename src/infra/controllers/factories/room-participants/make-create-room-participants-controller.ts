import { CreateRoomParticipantUseCase } from '../../../../use-case/room-participants/create-room-participant-use-case';
import { PrismaRoomParticipantsRepository } from '../../../external/prisma/repositories/prisma-room-participants-repository';
import { PrismaRoomRepository } from '../../../external/prisma/repositories/prisma-room-repository';
import { CreateRoomParticipantsController } from '../../room-participants/create-room-participants-controller';

export function makeCreateRoomParticipantsController() {
  const roomParticipantsRepository = new PrismaRoomParticipantsRepository();
  const roomRepository = new PrismaRoomRepository();
  const createRoomParticipantsUseCase = new CreateRoomParticipantUseCase(
    roomParticipantsRepository,
    roomRepository,
  );
  const createRoomParticipantsController = new CreateRoomParticipantsController(
    createRoomParticipantsUseCase,
  );

  return createRoomParticipantsController;
}
