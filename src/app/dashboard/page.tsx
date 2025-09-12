"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";

export default function DashboardPage() {
  const { user, setUser, clearUser } = useAuthStore();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    const http = await fetch("/api/user", {credentials: "include"});
    const data = await http.json();
    if (!http.ok) {
      clearUser();
      router.push("/auth/login");
      return;
    }

    setUser(data.user);
    setLoading(false);
  }

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  if (!user) return null;

  return (
    <React.Fragment>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      {/* <p className="mt-2">Welcome, {user.email}</p>
      <button
        onClick={async () => {
          await fetch("/api/auth/login", { method: "DELETE", credentials: "include" });
          clearUser();
          router.push("/auth/login");
        }}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button> */}
    </React.Fragment>
  );
}
