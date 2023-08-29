export function resultSuccess<T>(data: T, { msg = 'ok' } = {}) {
  return {
    code: 0,
    data,
    msg,
  };
}

export default resultSuccess;