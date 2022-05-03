import { LoginUseCase } from '../../../../use-case/auth/login-use-case';
import { PrismaUserRepository } from '../../../external/prisma/repositories/prisma-user-repository';
import { LoginController } from '../../auth/login-controller';

export function makeLoginController() {
  const userRepository = new PrismaUserRepository();
  const loginUseCase = new LoginUseCase(userRepository);
  const loginController = new LoginController(loginUseCase);

  return loginController;
}
