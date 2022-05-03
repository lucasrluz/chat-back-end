import { UserInterface } from '../../../../domain/user/interface/user-interface';
import { UserRepositoryInterface } from '../../../repositories/user-repository-interface';
import { prismaClient } from '../prisma-client';

export class PrismaUserRepository implements UserRepositoryInterface {
  async create(user: UserInterface) {
    const response = await prismaClient.user.create({
      data: {
        username: user.username,
        email: user.email,
        password: user.password,
      },
    });

    return {
      id: response.userId,
    };
  }

  async findById(id: string) {
    const response = await prismaClient.user.findFirst({
      where: { userId: id },
    });

    return {
      id: response?.userId,
      username: response?.username,
      email: response?.email,
      password: response?.password,
    };
  }

  async findByUsername(username: string) {
    const response = await prismaClient.user.findFirst({
      where: { username: username },
    });

    return {
      id: response?.userId,
      password: response?.password,
    };
  }

  async findByEmail(email: string) {
    const response = await prismaClient.user.findFirst({
      where: { email: email },
    });

    return {
      id: response?.userId,
    };
  }

  async updateUsername(userId: string, username: string) {
    await prismaClient.user.update({
      where: { userId: userId },
      data: { username: username },
    });
  }

  async updatePassword(userId: string, password: string) {
    await prismaClient.user.update({
      where: { userId: userId },
      data: { password: password },
    });
  }

  async deleteById(userId: string) {
    await prismaClient.user.delete({ where: { userId: userId } });
  }
}
