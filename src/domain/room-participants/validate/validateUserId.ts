import { error, success } from '../../../shared/response';

export function validateUserId(userId: string) {
  if (typeof userId !== 'string') return error('UserId must be a string');

  if (!userId) return error('UserId should not be empty');

  return success(userId);
}
