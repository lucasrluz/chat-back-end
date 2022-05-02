import { EditUserUseCase } from '../../../../use-case/user/edit-user-use-case';
import { PrismaUserRepository } from '../../../external/prisma/repositories/prisma-user-repository';
import { EditUserController } from '../../user/edit-user-controller';

export function makeEditUserController() {
  const userRepository = new PrismaUserRepository();
  const editUserUseCase = new EditUserUseCase(userRepository);
  const editUserController = new EditUserController(editUserUseCase);

  return editUserController;
}
