import { LoginUseCase } from '../../../use-case/auth/login-use-case';
import { ok, unauthorized } from '../respose/http-responses';

interface LoginData {
  username: string;
  password: string;
}

export class LoginController {
  private loginUseCase: LoginUseCase;

  constructor(loginUseCase: LoginUseCase) {
    this.loginUseCase = loginUseCase;
  }

  public async perform(loginData: LoginData) {
    const tokensOrError = await this.loginUseCase.perform(loginData);

    if (tokensOrError.isError()) return unauthorized(tokensOrError.value);

    return ok(tokensOrError.value);
  }
}
