import { NextResponse } from "next/server";
import { registerRepository } from "@/repository/auth_repository";

export async function POST(req: Request) {
  const {name, email, password} = await req.json();
  const authRepo = await registerRepository({name, email, password});

  if (authRepo.status) {
    return NextResponse.json({}, {status: authRepo.response_status});
  }

  return NextResponse.json({
    status: authRepo.status,
    token: authRepo.message
  }, {status: authRepo.response_status});
}
