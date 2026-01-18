"use client";

import { signOut, useSession } from "next-auth/react";
import { useUserStore } from "@/stores/user.store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";

export default function Page() {
  const { fetchUserDetail, userDeail } = useUserStore();
  const { data: session, status } = useSession();
  const router = useRouter();
  const handleLogout = async () => {
    await signOut({ redirect: false });
    useUserStore.getState().logout();
    window.location.href = "/login";
  };

  useEffect(() => {
    const checkUserStatus = async () => {
      if (status === "loading") return;

      if (!session?.user) {
        router.replace("/login");
        return;
      }

      const latestDetail = await fetchUserDetail(session.user.id);

      console.log(latestDetail, "latest user detail");

      if (!latestDetail || !latestDetail.id) {
        console.log("No user detail found, redirecting...");
        router.replace("/personalized");
      }
    };

    checkUserStatus();
  }, [status, session, router, fetchUserDetail]);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div>{session?.user.name}</div>

      <Button onClick={() => handleLogout()} className="bg-blue-700 ">
        LOGOUT
      </Button>
      {/* <div>{session?.user.name}</div>
      <div>{session?.user.name}</div> */}
    </main>
  );
}
