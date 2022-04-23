import { UserInterface } from '../../../src/domain/user/interface/user-interface';
import { UserRepositoryInterface } from '../../../src/infra/repositories/user-repository-interface';

interface userData {
  id: number;
  username: string;
  email: string;
  password: string;
}

export class InMemoryUserRepository implements UserRepositoryInterface {
  private users: userData[] = [];
  private userIdCounter = 0;

  public async create(user: UserInterface) {
    const userData: userData = {
      id: this.userIdCounter,
      username: user.username,
      email: user.email,
      password: user.password,
    };

    this.users.push(userData);

    return {
      id: this.userIdCounter.toString(),
    };
  }

  public async findByUsername(username: string) {
    const userOrEmpty = this.users.find((user) => user.username === username);

    if (typeof userOrEmpty === 'object')
      return {
        id: userOrEmpty.id.toString(),
      };

    return {
      id: undefined,
    };
  }

  public async findByEmail(email: string) {
    const userOrEmpty = this.users.find((user) => user.email === email);

    if (typeof userOrEmpty === 'object')
      return {
        id: userOrEmpty.id.toString(),
      };

    return {
      id: undefined,
    };
  }

  public async delete(id: string) {
    const index = this.users.findIndex(
      (user: userData) => user.id === parseInt(id),
    );

    if (index !== -1) {
      this.users.splice(index, 1);

      return;
    }

    return;
  }
}
