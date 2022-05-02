import { DeleteUserUseCase } from '../../../../use-case/user/delete-user-use-case';
import { PrismaUserRepository } from '../../../external/prisma/repositories/prisma-user-repository';
import { DeleteUserController } from '../../user/delete-user-controller';

export async function makeDeleteUserController() {
  const userRepository = new PrismaUserRepository();
  const deleteUserUseCase = new DeleteUserUseCase(userRepository);
  const deleteUserController = new DeleteUserController(deleteUserUseCase);

  return deleteUserController;
}
