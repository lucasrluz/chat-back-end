export function ok(value: any) {
  return {
    status: 200,
    value,
  };
}

export function created(value: any) {
  return {
    status: 201,
    value,
  };
}

export function noContent() {
  return {
    status: 204,
    value: '',
  };
}

export function badRequest(value: any) {
  return {
    status: 400,
    value,
  };
}

export function unauthorized(value: any) {
  return {
    status: 401,
    value,
  };
}

export function notFound(value: any) {
  return {
    status: 404,
    value,
  };
}
