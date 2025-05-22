export function getRedirectPathFromErrorCode(code?: number) {
  if (code === 401) return '/401';
  if (code === 403) return '/401';
  if (code === 404) return '/not-found';
  return '/error';
}
