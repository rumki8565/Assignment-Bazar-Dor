"use client";

import type { AuthUser } from "@/types";

export interface CurrentUserState {
  user: AuthUser | null;
  isPending: boolean;
}

// Placeholder until Step 6 (BetterAuth). It will return authClient.useSession() data.
export function useCurrentUser(): CurrentUserState {
  return { user: null, isPending: false };
}
