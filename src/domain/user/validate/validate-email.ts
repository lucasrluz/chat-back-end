import { error, success } from '../../../shared/response';

export function validateEmail(email: string) {
  const minLocalSize = 1;
  const maxLocalSize = 64;
  const minDomainSize = 1;
  const maxDomainSize = 255;

  if (typeof email !== 'string' || email.length === 0)
    return error('Email must be an email');

  const [local, domain] = email.split('@');

  if (local.length < minLocalSize || local.length > maxLocalSize)
    return error(
      `Email location size must be between ${minLocalSize} and ${maxLocalSize} characters`,
    );

  if (domain.length < minDomainSize || domain.length > maxDomainSize)
    return error(
      `Email domain size must be between ${minDomainSize} and ${maxDomainSize} characters`,
    );

  return success(email);
}
