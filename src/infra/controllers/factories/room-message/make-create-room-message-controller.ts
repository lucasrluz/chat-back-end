import { CreateRoomMessageUseCase } from '../../../../use-case/room-messages/create-room-message-use-case';
import { PrismaRoomMessageRepository } from '../../../external/prisma/repositories/prisma-room-message-repository';
import { PrismaRoomRepository } from '../../../external/prisma/repositories/prisma-room-repository';
import { CreateRoomMessageController } from '../../room-message/create-room-message-controller';

export function makeCreateRoomMessageController() {
  const roomMessageRepository = new PrismaRoomMessageRepository();
  const roomRepository = new PrismaRoomRepository();

  const createRoomMessageUseCase = new CreateRoomMessageUseCase(
    roomMessageRepository,
    roomRepository,
  );
  const createRoomMessageController = new CreateRoomMessageController(
    createRoomMessageUseCase,
  );

  return createRoomMessageController;
}
