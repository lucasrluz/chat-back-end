import { EditRoomUseCase } from '../../../../use-case/room/edit-room-use-case';
import { PrismaRoomRepository } from '../../../external/prisma/repositories/prisma-room-repository';
import { EditRoomController } from '../../room/edit-room-controller';

export function makeEditRoomController() {
  const roomRepository = new PrismaRoomRepository();
  const editRoomUseCase = new EditRoomUseCase(roomRepository);
  const editRoomController = new EditRoomController(editRoomUseCase);

  return editRoomController;
}
