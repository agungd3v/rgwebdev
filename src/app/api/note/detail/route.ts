import { NextResponse } from "next/server";
import NoteRepository from "@/repository/note_repository";

const noteRepo = new NoteRepository();

export async function POST(req: Request) {
  const {id} = await req.json();
  const note = await noteRepo.getNoteDetail({noteId: id});

  if (!note) {
    return NextResponse.json({message: "Note tidak ditemukan"}, {status: 404});
  }
  
  return NextResponse.json({data: note});
}