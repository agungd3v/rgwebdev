import { NextRequest, NextResponse } from "next/server";
import NoteRepository from "@/repository/note_repository";

const noteRepo = new NoteRepository();

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const page = parseInt(params.get("page") || "1", 10);
  const size = parseInt(params.get("size") || "10", 10);

  const notes = await noteRepo.getPublicNotes({page, size});
  if (!notes) {
    return NextResponse.json({data: notes}, {status: 404});
  }

  return NextResponse.json({...notes});
}