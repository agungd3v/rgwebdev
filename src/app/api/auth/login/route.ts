import { NextResponse } from "next/server";
import { loginRepository } from "@/repository/auth_repository";

export async function POST(req: Request) {
  const {email, password} = await req.json();
  const authRepo = await loginRepository({email, password});

  if (authRepo.status) {
    const res = NextResponse.json({token: authRepo.message});
    res.cookies.set("token", authRepo.message, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
      path: "/"
    });

    return res;
  }

  return NextResponse.json({
    status: authRepo.status,
    token: authRepo.message
  }, {status: authRepo.response_status});
}

export async function DELETE() {
  const res = NextResponse.json({message: "Logged out"});

  res.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(0),
    path: "/",
  });

  return res;
}