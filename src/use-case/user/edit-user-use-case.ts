import { Password } from '../../domain/user/password';
import { Username } from '../../domain/user/username';
import { compareHashPassword } from '../../infra/external/bcrypt/compare-hash-password';
import { createHashPassword } from '../../infra/external/bcrypt/create-hash-password';
import { UserRepositoryInterface } from '../../infra/repositories/user-repository-interface';
import { error, success } from '../../shared/response';

interface EditUserData {
  userId: string;
  username: string;
  password: string;
}

export class EditUserUseCase {
  private userRepository: UserRepositoryInterface;

  constructor(userRepository: UserRepositoryInterface) {
    this.userRepository = userRepository;
  }

  public async perform(editUserData: EditUserData) {
    const userOrEmpty = await this.userRepository.findById(editUserData.userId);

    if (!userOrEmpty.id) return error('User not found');

    if (editUserData.username !== userOrEmpty.username) {
      const usernameOrError = Username.create(editUserData.username);

      if (usernameOrError.isError()) return error(usernameOrError.value);

      const userOrEmpty = await this.userRepository.findByUsername(
        editUserData.username,
      );

      if (userOrEmpty.id) return error('This username already exists');

      await this.userRepository.updateUsername(
        editUserData.userId,
        editUserData.username,
      );
    }

    const passwordOrError = Password.create(editUserData.password);

    if (passwordOrError.isError()) return error(passwordOrError.value);

    if (
      !(await compareHashPassword(editUserData.password, userOrEmpty.password!))
    ) {
      editUserData.password = await createHashPassword(editUserData.password);

      await this.userRepository.updatePassword(
        editUserData.userId,
        editUserData.password,
      );
    }

    return success({
      id: editUserData.userId,
    });
  }
}
