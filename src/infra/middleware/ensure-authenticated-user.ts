import {
  badRequest,
  notFound,
  ok,
} from '../controllers/respose/http-responses';
import { validateAccessToken } from '../external/jsonwebtoken/validate-tokens';

export function ensureAuthenticatedUser(accessToken: string) {
  if (!accessToken) return notFound('Token not found');
  const validateTokenResponse = validateAccessToken(accessToken);

  if (validateTokenResponse.isError())
    return badRequest(validateTokenResponse.value);

  return ok('Token valid');
}
