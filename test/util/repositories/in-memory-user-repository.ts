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

  public async findById(id: string) {
    const userOrEmpty = this.users.find((user) => user.id === parseInt(id));

    if (typeof userOrEmpty === 'object')
      return {
        id: userOrEmpty.id.toString(),
        username: userOrEmpty.username,
        email: userOrEmpty.email,
        password: userOrEmpty.password,
      };

    return {
      id: undefined,
      username: undefined,
      email: undefined,
      password: undefined,
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

  public async updateUsername(userId: string, username: string) {
    const index = this.users.findIndex((user) => user.id === parseInt(userId));

    this.users[index].username = username;

    return;
  }

  public async updatePassword(userId: string, password: string) {
    const index = this.users.findIndex((user) => user.id === parseInt(userId));

    this.users[index].password = password;

    return;
  }

  public async deleteById(userId: string) {
    const index = this.users.findIndex(
      (user: userData) => user.id === parseInt(userId),
    );

    if (index !== -1) {
      this.users.splice(index, 1);

      return;
    }

    return;
  }

  public async deleteMany() {
    this.users = [];

    return;
  }
}
