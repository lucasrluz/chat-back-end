import { error, success } from '../../shared/response';

export function validateName(name: string) {
  if (typeof name !== 'string') return error('Name must be a string');

  if (!name) return error('Name should not be empty');

  return success(name);
}
