import { CreateUserUseCase } from '../../../../use-case/user/create-user-use-case';
import { PrismaUserRepository } from '../../../external/prisma/repositories/prisma-user-repository';
import { CreateUserController } from '../../create-user-controller';

export function makeCreateUserController() {
  const userRepository = new PrismaUserRepository();
  const createUserUseCase = new CreateUserUseCase(userRepository);
  const createUserController = new CreateUserController(createUserUseCase);

  return createUserController;
}
