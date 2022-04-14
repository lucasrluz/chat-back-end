import { error, success } from '../../shared/response';
import { validatePassword } from './validate/validate-password';

export class Password {
  public value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(password: string) {
    const successOrError = validatePassword(password);

    if (successOrError.isError()) return error(successOrError.value);

    return success(new Password(password));
  }
}
