import { sign } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export function generateRefreshToken(userId: string) {
  return sign({}, process.env.REFRESH_TOKEN_PRIVATE_KEY as string, {
    subject: userId,
    expiresIn: '1m',
  });
}
