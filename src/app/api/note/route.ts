import { NextResponse } from "next/server";
import NoteRepository from "@/repository/note_repository";

const noteRepo = new NoteRepository();

export async function GET(req: Request) {
  const notes = await noteRepo.getNotes();
  if (!notes) {
    return NextResponse.json({data: notes}, {status: 404});
  }

  return NextResponse.json({data: notes});
}

export async function POST(req: Request) {
  const {title, description, visibility} = await req.json();
  const storeNote = await noteRepo.storeNote({title, description, visibility});

  if (!storeNote) {
    return NextResponse.json({message: "Gagal membuat note"}, {status: 400});
  }

  return NextResponse.json({}, {status: 201});
}