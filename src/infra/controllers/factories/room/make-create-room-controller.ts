import { CreateRoomUseCase } from '../../../../use-case/room/create-room-use-case';
import { PrismaRoomRepository } from '../../../external/prisma/repositories/prisma-room-repository';
import { CreateRoomController } from '../../room/create-room-controller';

export function makeCreateRoomController() {
  const roomRepository = new PrismaRoomRepository();
  const createRoomUseCase = new CreateRoomUseCase(roomRepository);
  const createRoomController = new CreateRoomController(createRoomUseCase);

  return createRoomController;
}
