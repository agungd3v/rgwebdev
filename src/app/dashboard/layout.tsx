import { getUserRepository } from "@/repository/auth_repository";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  const getUser = await getUserRepository(false);
  if (!getUser.status) {
    return redirect("/auth/login");
  }

  return (
    <div className="max-w-[1024px] mx-auto p-6">
      <div className="mb-5 border-b border-gray-300 flex">
        <div className="flex-1 flex">
          <Link
            href={"/dashboard"}
            className="font-semibold text-green-400 border-b-2 border-green-400 flex items-center h-10 px-3"
          >
            Dashboard
          </Link>
          <Link
            href={"/dashboard/notes"}
            className="border-b-2 border-transparent flex items-center h-10 px-3"
          >
            Notes
          </Link>
        </div>
        <div className="flex items-center h-10 px-3">
          Profile
        </div>
      </div>
      {children}
    </div>
  );
}
