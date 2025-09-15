"use client"

import { useRouter } from "next/navigation";
import { BsFront } from "react-icons/bs";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const res = await fetch("/api/auth/login", {
      method: "DELETE",
      headers: {"Content-Type": "application/json"}
    });

    if (res.ok) {
      router.replace("/");
    }
  }

  return (
    <div
      className="flex items-center h-10 px-3 border-2 border-b-0 rounded-t-xl gap-2 bg-orange-700 text-yellow-200 font-bold border-orange-700 cursor-pointer select-none"
      onClick={handleLogout}
    >
      <BsFront />
      Logout
    </div>
  );
}