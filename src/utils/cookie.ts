export function addCookie(key: string, value: string, options?: { maxAge: number }) {
  let newCookie = `${key}=${value}`;

  if (options?.maxAge) {
    newCookie += `; max-age=${options.maxAge}`;
  }

  document.cookie = newCookie;
}
