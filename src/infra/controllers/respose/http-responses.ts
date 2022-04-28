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
