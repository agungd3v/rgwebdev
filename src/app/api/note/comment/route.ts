import { NextResponse } from "next/server";
import CommentRepository from "@/repository/comment_repository";

const commentRepo = new CommentRepository();

export async function POST(req: Request) {
  const {id, comment} = await req.json();
  const storeComment = await commentRepo.storeComment({noteId: id, comment});

  if (!storeComment) {
    return NextResponse.json({message: "Gagal memberikan komentar"}, {status: 400});
  }

  return NextResponse.json({}, {status: 201});
}