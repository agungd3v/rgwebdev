import { NextResponse } from "next/server";
import AuthRepository from "@/repository/auth_repository";

const authRepo = new AuthRepository();

export async function POST(req: Request) {
  const {email, password} = await req.json();
  const login = await authRepo.login({email, password});

  if (!login) {
    return NextResponse.json({message: "Email atau password salah"}, {status: 401});
  }

  const res = NextResponse.json({token: login});
  res.cookies.set("token", login, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60,
    path: "/"
  });

  return res;
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