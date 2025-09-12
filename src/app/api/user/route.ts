import { NextResponse } from "next/server";
import { getUserRepository } from "@/repository/auth_repository";

export async function GET(req: Request) {
  const authRepo = await getUserRepository(true);
  if (authRepo.status) {
    return NextResponse.json({user: authRepo.message});
  }

  return NextResponse.json({
    status: authRepo.status,
    token: authRepo.message
  }, {status: authRepo.response_status});
}
