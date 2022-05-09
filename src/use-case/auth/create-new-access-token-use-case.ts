import { generateRefreshToken } from '../../infra/external/jsonwebtoken/generate-refresh-token';
import { generateToken } from '../../infra/external/jsonwebtoken/generate-token';
import { validateRefreshToken } from '../../infra/external/jsonwebtoken/validate-tokens';
import { error, success } from '../../shared/response';
import { refreshtokens } from './util/refresh-tokens';

export class CreateNewAccessTokenUseCase {
  public async perform(refreshtoken: string, userId: string) {
    if (!refreshtokens.includes(refreshtoken)) return error('Token invalid');

    const successOrError = validateRefreshToken(refreshtoken);

    if (successOrError.isError()) return error(successOrError.value);

    const newAccessToken = generateToken(userId);
    const newRefreshToken = generateRefreshToken(userId);

    const index = refreshtokens.findIndex((token) => token === refreshtoken);

    refreshtokens.splice(index, 1);

    refreshtokens.push(newRefreshToken);

    return success({
      newAccessToken,
      newRefreshToken,
    });
  }
}
