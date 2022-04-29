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

export function badRequest(value: any) {
  return {
    status: 400,
    value,
  };
}

export function notFound(value: any) {
  return {
    status: 404,
    value,
  };
}
