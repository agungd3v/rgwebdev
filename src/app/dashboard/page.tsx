"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";

export default function DashboardPage() {
  const { setUser, clearUser } = useAuthStore();
  const router = useRouter();

  // const fetchUser = useCallback(async () => {
  //   const http = await fetch("/api/user", {credentials: "include"});
  //   if (!http.ok) {
  //     clearUser();
  //     router.push("/auth/login");
  //     return;
  //   }

  //   const data = await http.json();

  //   setUser(data.user);
  // }, [clearUser, router, setUser]);

  // useEffect(() => {
  //   fetchUser();
  // }, [fetchUser]);

  return (
    <React.Fragment>
      <h1 className="text-2xl font-bold">Dashboard</h1>
    </React.Fragment>
  );
}
