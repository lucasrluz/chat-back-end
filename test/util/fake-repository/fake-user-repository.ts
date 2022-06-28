import { UserInterface } from '../../../src/domain/user/interface/user-interface';
import { UserRepositoryInterface } from '../../../src/infra/repositories/user-repository-interface';

export class FakeUserRepository implements UserRepositoryInterface {
  create(user: UserInterface): Promise<{ id: string }> {
    user;
    return Promise.resolve({ id: '' });
  }

  findById(id: string): Promise<{
    id: string | undefined;
    username: string | undefined;
    email: string | undefined;
    password: string | undefined;
  }> {
    id;
    return Promise.resolve({
      id: '',
      username: '',
      email: '',
      password: '',
    });
  }

  findByUsername(
    username: string,
  ): Promise<{ id: string | undefined; password: string | undefined }> {
    username;
    return Promise.resolve({ id: '', password: '' });
  }

  findByEmail(email: string): Promise<{ id: string | undefined }> {
    email;
    return Promise.resolve({ id: '' });
  }

  updateUsername(userId: string, username: string): Promise<void> {
    userId;
    username;
    return Promise.resolve();
  }

  updatePassword(userId: string, password: string): Promise<void> {
    userId;
    password;
    return Promise.resolve();
  }

  deleteById(userId: string): Promise<void> {
    userId;
    return Promise.resolve();
  }
}
