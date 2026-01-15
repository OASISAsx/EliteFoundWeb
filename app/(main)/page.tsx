"use client";
import { useSession } from "next-auth/react";
import { useUserStore } from "@/stores/user.store";
import { useEffect } from "react";
import BackgroundDark from "@/components/Background/BackgroundDark";

export default function Page() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      useUserStore.getState().setUser(session.user);
    }
  }, [session]);
  return (
    <main className="flex min-h-screen items-center justify-center">
      {/* <ThemeToggleClient /> */}
      <BackgroundDark />
      <div>{session?.user?.name || "www"} </div>
    </main>
  );
}
