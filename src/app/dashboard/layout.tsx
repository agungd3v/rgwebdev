import { redirect } from "next/navigation";
import AuthRepository from "@/repository/auth_repository";
import DashboardNavbar from "@/components/DashboardNavbar";
import LogoutButton from "@/components/LogoutButton";

const authRepo = new AuthRepository();

export default async function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  const getUser = await authRepo.getUser();
  if (!getUser) {
    return redirect("/auth/login");
  }

  return (
    <div className="max-w-[1024px] mx-auto p-6">
      <div className="mb-5 border-b-2 border-orange-700 flex">
        <div className="flex-1 flex">
          <DashboardNavbar />
        </div>
        <LogoutButton />
      </div>
      {children}
    </div>
  );
}
