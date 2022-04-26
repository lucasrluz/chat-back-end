import { UserRepositoryInterface } from '../../infra/repositories/user-repository-interface';
import { error, success } from '../../shared/response';

export class DeleteUserUseCase {
  private userRepository: UserRepositoryInterface;

  constructor(userRepository: UserRepositoryInterface) {
    this.userRepository = userRepository;
  }

  public async perform(userId: string) {
    const userOrEmpty = await this.userRepository.findById(userId);

    if (!userOrEmpty.id) return error('User not found');

    await this.userRepository.deleteById(userOrEmpty.id);

    return success();
  }
}
