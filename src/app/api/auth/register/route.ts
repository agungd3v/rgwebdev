import { NextResponse } from "next/server";
import AuthRepository from "@/repository/auth_repository";

const authRepo = new AuthRepository();

export async function POST(req: Request) {
  const {name, email, password} = await req.json();
  const register = await authRepo.register({name, email, password});

  if (!register) {
    return NextResponse.json({message: "User sudah terdaftar"}, {status: 400});
  }

  return NextResponse.json({}, {status: 201});
}
