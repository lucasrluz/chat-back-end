import { compare } from 'bcrypt';

export async function compareHashPassword(
  password: string,
  hashPassword: string,
) {
  return await compare(password, hashPassword);
}
