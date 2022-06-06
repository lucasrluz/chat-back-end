import { DeleteRoomUseCase } from '../../../../use-case/room/delete-room-use-case';
import { PrismaRoomRepository } from '../../../external/prisma/repositories/prisma-room-repository';
import { DeleteRoomController } from '../../room/delete-room-controller';

export function makeDeleteRoomController() {
  const roomRepository = new PrismaRoomRepository();
  const deleteRoomUseCase = new DeleteRoomUseCase(roomRepository);
  const deleteRoomController = new DeleteRoomController(deleteRoomUseCase);

  return deleteRoomController;
}
