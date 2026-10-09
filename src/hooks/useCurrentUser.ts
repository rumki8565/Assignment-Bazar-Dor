"use client";

import { authClient } from "@/lib/auth-client";
import type { AuthUser } from "@/types";

export interface CurrentUserState {
  user: AuthUser | null;
  isPending: boolean;
}

export function useCurrentUser(): CurrentUserState {
  const { data, isPending } = authClient.useSession();
  const sessionUser = data?.user;

  const user: AuthUser | null = sessionUser
    ? {
        name: sessionUser.name,
        email: sessionUser.email,
        image: sessionUser.image ?? null,
      }
    : null;

  return { user, isPending };
}
