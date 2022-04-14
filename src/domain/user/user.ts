import { error, success } from '../../shared/response';
import { Email } from './email';
import { Password } from './password';
import { Username } from './username';

export class User {
  public username: Username;
  public email: Email;
  public password: Password;

  private constructor(username: Username, email: Email, password: Password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  public static create(username: string, email: string, password: string) {
    const usernameOrError = Username.create(username);
    const emailOrError = Email.create(email);
    const passwordOrError = Password.create(password);

    if (usernameOrError.isError()) return error(usernameOrError.value);
    if (emailOrError.isError()) return error(emailOrError.value);
    if (passwordOrError.isError()) return error(passwordOrError.value);

    const user = new User(
      usernameOrError.value,
      emailOrError.value,
      passwordOrError.value,
    );

    return success({
      username: user.username.value,
      email: user.email.value,
      password: user.password.value,
    });
  }
}
