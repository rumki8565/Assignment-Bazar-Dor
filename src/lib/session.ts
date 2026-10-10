import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

export async function getServerSession() {
  return auth.api.getSession({ headers: await headers() });
}

/**
 * Use at the top of a protected page. Visitors who are not logged in are sent
 * to the sign in page (which shows a toast) and come back here after login.
 */
export async function requireSession(callbackUrl: string) {
  const session = await getServerSession();
  if (!session) {
    redirect(
      `/signin?callbackUrl=${encodeURIComponent(callbackUrl)}&reason=login-required`,
    );
  }
  return session;
}
