/** Accepts only same-site paths like "/product/x" (blocks "//evil.com" etc.). */
export function getSafeCallbackUrl(
  value: string | string[] | undefined,
): string {
  const candidate = Array.isArray(value) ? value[0] : value;
  if (!candidate) return "/";
  if (
    !candidate.startsWith("/") ||
    candidate.startsWith("//") ||
    candidate.startsWith("/\\")
  ) {
    return "/";
  }
  return candidate;
}

export function withCallbackUrl(path: string, callbackUrl: string): string {
  return callbackUrl === "/"
    ? path
    : `${path}?callbackUrl=${encodeURIComponent(callbackUrl)}`;
}
