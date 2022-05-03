import { sign } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export function generateToken(userId: string) {
  return sign({}, process.env.ACCESS_TOKEN_PRIVATE_KEY as string, {
    subject: userId,
    expiresIn: '10s',
  });
}
