"use client";

import { useSession } from "next-auth/react";
import { useUserStore } from "@/stores/user.store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const { fetchUser, user } = useUserStore();
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

  useEffect(() => {
    if (!user) return;

    if (!user.usersInformationId) {
      router.replace("/personalized");
    }
  }, [user, router]);

  if (status === "loading") return null;

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div>{session?.user.name}</div>
      <div>
        {typeof session?.user.usersInformation === "string"
          ? session?.user.usersInformation
          : ""}
      </div>
      {/* <div>{session?.user.name}</div>
      <div>{session?.user.name}</div> */}
    </main>
  );
}
