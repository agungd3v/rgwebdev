import { NextResponse } from "next/server";
import AuthRepository from "@/repository/auth_repository";

const authRepo = new AuthRepository();

export async function GET(req: Request) {
  const getUser = await authRepo.getUser();
  if (!getUser) {
    return NextResponse.json({message: "user tidak ditemukan"}, {status: 404});
  }

  return NextResponse.json({user: getUser});
}
