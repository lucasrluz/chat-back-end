import { verify } from 'jsonwebtoken';
import { error, success } from '../../../shared/response';

export function validateAccessToken(token: string, userId: string) {
  try {
    return success(
      verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY as string, {
        subject: userId,
      }),
    );
  } catch (err) {
    return error(err);
  }
}

export function validateRefreshToken(token: string) {
  try {
    return success(
      verify(token, process.env.REFRESH_TOKEN_PRIVATE_KEY as string),
    );
  } catch (err) {
    return error(err);
  }
}
