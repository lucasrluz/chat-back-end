import { error, success } from '../../../shared/response';

export function validateContent(content: string) {
  if (typeof content !== 'string') return error('Content must be a string');

  if (!content) return error('Content should not be empty');

  return success(content);
}
