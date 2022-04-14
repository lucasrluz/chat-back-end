import { error, success } from '../../shared/response';
import { validateEmail } from './validate/validate-email';

export class Email {
  public value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(email: string) {
    const successOrError = validateEmail(email);

    if (successOrError.isError()) return error(successOrError.value);

    return success(new Email(email));
  }
}
