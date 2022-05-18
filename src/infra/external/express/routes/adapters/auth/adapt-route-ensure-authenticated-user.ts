/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { NextFunction, Request, Response } from 'express';
import { ensureAuthenticatedUser } from '../../../../../middleware/ensure-authenticated-user';

export function ensureAuthenticatedUserAdaptRoute() {
  return (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization;

    const [, accessToken] = header!.split(' ');

    const validateAccessTokenResponse = ensureAuthenticatedUser(accessToken!);

    if (validateAccessTokenResponse.status !== 200)
      return res
        .status(validateAccessTokenResponse.status)
        .json(validateAccessTokenResponse.value);

    return next();
  };
}
