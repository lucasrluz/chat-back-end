import { error, success } from '../../shared/response';
import { validateUsername } from './validate/validate-username';

export class Username {
  public value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(username: string) {
    const successOrError = validateUsername(username);

    if (successOrError.isError()) return error(successOrError.value);

    return success(new Username(username));
  }
}
