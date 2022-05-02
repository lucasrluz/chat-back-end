import { UserInterface } from '../../domain/user/interface/user-interface';
import { User } from '../../domain/user/user';
import { createHashPassword } from '../../infra/external/bcrypt/create-hash-password';
import { UserRepositoryInterface } from '../../infra/repositories/user-repository-interface';
import { error, success } from '../../shared/response';

export class CreateUserUseCase {
  private userRepository: UserRepositoryInterface;

  constructor(userRepository: UserRepositoryInterface) {
    this.userRepository = userRepository;
  }

  public async perform(user: UserInterface) {
    const userOrError = User.create(user.username, user.email, user.password);

    if (userOrError.isError()) return error(userOrError.value);

    const findUserByUsername = await this.userRepository.findByUsername(
      user.username,
    );

    if (findUserByUsername.id) return error('This username already exists');

    const findUserByEmail = await this.userRepository.findByEmail(user.email);

    if (findUserByEmail.id) return error('This email already exists');

    const hashPassword = await createHashPassword(user.password);

    user.password = hashPassword;

    const createUserResponse = await this.userRepository.create(user);

    return success({
      id: createUserResponse.id,
    });
  }
}
