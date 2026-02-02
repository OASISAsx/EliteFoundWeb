"use client";

import { signOut, useSession } from "next-auth/react";
import { useUserStore } from "@/src/stores/user.store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
// import DashboardPage from "./dashboard/page";

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

      // const latestDetail = await fetchUserDetail(
      //   session.user.id,
      //   session.user.backendToken,
      // );

      // console.log(latestDetail, "latest user detail");

      // if (!latestDetail || !latestDetail.id) {
      //   console.log("No user detail found, redirecting...");
      //   router.replace("/personalized");
      // }
    };

    checkUserStatus();
  }, [status, session, router, fetchUserDetail]);
}
