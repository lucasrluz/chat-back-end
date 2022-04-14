import { error, success } from '../../../shared/response';

export function validatePassword(password: string) {
  if (typeof password !== 'string') return error('Password must be a string');

  const minPasswordSize = 6;
  if (password.length < minPasswordSize)
    return error(
      `Password length must be longer than ${minPasswordSize} characters`,
    );

  return success(password);
}
