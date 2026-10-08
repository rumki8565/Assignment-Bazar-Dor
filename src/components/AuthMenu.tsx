"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import type { AuthUser } from "@/types";

function UserMenu({ user }: { user: AuthUser }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const initial = Array.from(user.name.trim())[0] ?? "?";

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 hover:bg-brand-soft"
      >
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.image}
            alt={user.name}
            className="h-8 w-8 rounded-full object-cover"
          />
        ) : (
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white">
            {initial}
          </span>
        )}
        <span className="hidden max-w-32 truncate text-sm font-medium text-ink sm:inline">
          {user.name}
        </span>
        <span aria-hidden className="text-[10px] text-muted">
          ▾
        </span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 w-56 rounded-xl border border-line bg-surface p-3 shadow-lg"
        >
          <p className="truncate text-sm font-semibold text-ink">{user.name}</p>
          <p className="truncate text-xs text-muted">{user.email}</p>
          <hr className="my-2 border-line" />
          <Link
            href="/profile"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="block rounded-md px-2 py-1.5 text-sm text-ink hover:bg-brand-soft"
          >
            👤 আমার প্রোফাইল
          </Link>
          <button
            type="button"
            role="menuitem"
            // Step 6: call authClient.signOut() here
            onClick={() => setOpen(false)}
            className="block w-full rounded-md px-2 py-1.5 text-left text-sm text-rise hover:bg-rise-soft"
          >
            ↩&#xFE0E; সাইন আউট
          </button>
        </div>
      )}
    </div>
  );
}

export default function AuthMenu() {
  const { user, isPending } = useCurrentUser();

  if (isPending) {
    return (
      <div aria-hidden className="h-9 w-32 animate-pulse rounded-lg bg-line" />
    );
  }

  if (!user) {
    return (
      <div className="flex items-center gap-1.5 sm:gap-2">
        <Link
          href="/signin"
          className="btn btn-ghost btn-sm sm:btn-md text-ink"
        >
          সাইন ইন
        </Link>
        <Link
          href="/signup"
          className="btn btn-sm sm:btn-md border-brand bg-brand text-white hover:border-brand-dark hover:bg-brand-dark"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  return <UserMenu user={user} />;
}
