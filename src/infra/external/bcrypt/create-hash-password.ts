import { hash } from 'bcrypt';

export async function createHashPassword(password: string) {
  return await hash(password, 10);
}
