import { PrismaClient } from '@prisma/client';
import { UserInterface } from '../../../src/domain/user/interface/user-interface';
import { createHashPassword } from '../../../src/infra/external/bcrypt/create-hash-password';

export class TestUserRepository {
  private prismaClient = new PrismaClient();

  public async create(user: UserInterface) {
    user.password = await createHashPassword(user.password);

    return await this.prismaClient.user.create({
      data: {
        username: user.username,
        email: user.email,
        password: user.password,
      },
    });
  }

  public async deleteMany() {
    await this.prismaClient.user.deleteMany();
  }
}
