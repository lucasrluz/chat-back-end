import { PrismaClient } from '@prisma/client';
import { UserInterface } from '../../../src/domain/user/interface/user-interface';

export class UserTestsRepository {
  private prismaClient = new PrismaClient();

  public async create(user: UserInterface) {
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
