import { generateRefreshToken } from '../../../../src/infra/external/jsonwebtoken/generate-refresh-token';
import {
  validateAccessToken,
  validateRefreshToken,
} from '../../../../src/infra/external/jsonwebtoken/validate-tokens';
import { CreateNewAccessTokenUseCase } from '../../../../src/use-case/auth/create-new-access-token-use-case';
import { refreshtokens } from '../../../../src/use-case/auth/util/refresh-tokens';

jest.useFakeTimers();

describe('Create new access token tests', () => {
  const createNewAccessTokenUseCase = new CreateNewAccessTokenUseCase();

  it('Should return access token and refresh token', async () => {
    const userId = '0';

    const refreshToken = generateRefreshToken(userId);

    refreshtokens.push(refreshToken);

    const response = await createNewAccessTokenUseCase.perform(
      refreshToken,
      userId,
    );

    const validateAccessTokenResponse = validateAccessToken(
      response.value.newAccessToken,
      userId,
    );

    const validateRefreshTokenResponse = validateRefreshToken(
      response.value.newRefreshToken,
    );

    expect(validateAccessTokenResponse.isSuccess()).toEqual(true);
    expect(validateRefreshTokenResponse.isSuccess()).toEqual(true);

    refreshtokens.splice(0, refreshtokens.length);
  });

  it('Should return error message', async () => {
    const refreshToken = generateRefreshToken('0');

    const response = await createNewAccessTokenUseCase.perform(
      refreshToken,
      '0',
    );

    expect(response.isError()).toEqual(true);
    expect(response.value).toEqual('Token invalid');
  });

  it('Should return error message', async () => {
    const refreshToken = generateRefreshToken('0');

    refreshtokens.push(refreshToken);

    jest.advanceTimersByTime(60000);

    const response = await createNewAccessTokenUseCase.perform(
      refreshToken,
      '0',
    );

    expect(response.isError()).toEqual(true);

    refreshtokens.splice(0, refreshtokens.length);
  });
});
