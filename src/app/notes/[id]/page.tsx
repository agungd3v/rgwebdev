import NoteDetail from "@/components/NoteDetail";
import NotFound from "@/components/NoutFound";
import NoteRepository from "@/repository/note_repository";

const noteRepo = new NoteRepository();

export default async function NoteDetailPage(context: any) {
  const {id} = await context.params;
  const getNoteDetail = await noteRepo.getNoteDetail({noteId: id});

  if (!getNoteDetail) return <NotFound />

  const data = getNoteDetail.toJSON();
  if (data.visibility === "private") return <NotFound />

  return <NoteDetail data={data} />;
}