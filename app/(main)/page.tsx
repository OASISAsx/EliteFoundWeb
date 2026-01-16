"use client";

import { useSession } from "next-auth/react";
import { useUserStore } from "@/stores/user.store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!session?.user) {
      router.replace("/login");
      return;
    }

    useUserStore.getState().setUser(session.user);
  }, [session, status, router]);

  if (status === "loading") return null;

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div>{session?.user?.name}</div>
    </main>
  );
}
