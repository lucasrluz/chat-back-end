export function success(value: any) {
  return {
    value,
    isSuccess: () => true,
    isError: () => false,
  };
}

export function error(value: any) {
  return {
    value,
    isSuccess: () => false,
    isError: () => true,
  };
}
