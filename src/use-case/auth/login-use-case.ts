import { compareHashPassword } from '../../infra/external/bcrypt/compare-hash-password';
import { generateRefreshToken } from '../../infra/external/jsonwebtoken/generate-refresh-token';
import { generateToken } from '../../infra/external/jsonwebtoken/generate-token';
import { UserRepositoryInterface } from '../../infra/repositories/user-repository-interface';
import { error, success } from '../../shared/response';

interface LoginData {
  username: string;
  password: string;
}

export class LoginUseCase {
  private userRepository: UserRepositoryInterface;

  constructor(userRepository: UserRepositoryInterface) {
    this.userRepository = userRepository;
  }

  public async perform(loginData: LoginData) {
    const userOrEmpty = await this.userRepository.findByUsername(
      loginData.username,
    );

    if (!userOrEmpty.id) return error('Username or password invalid');

    if (!(await compareHashPassword(loginData.password, userOrEmpty.password!)))
      return error('Username or password invalid');

    const accessToken = generateToken(userOrEmpty.id);

    const refreshToken = generateRefreshToken(userOrEmpty.id);

    return success({
      accessToken,
      refreshToken,
    });
  }
}
