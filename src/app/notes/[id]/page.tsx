import NoteDetail from "@/components/NoteDetail";
import NotFound from "@/components/NoutFound";
import AuthRepository from "@/repository/auth_repository";
import NoteRepository from "@/repository/note_repository";

const noteRepo = new NoteRepository();
const authRepo = new AuthRepository();

export default async function NoteDetailPage(context: any) {
  const {id} = await context.params;
  const getNoteDetail = await noteRepo.getNoteDetail({noteId: id});
  const getUser = await authRepo.getUser();

  if (!getNoteDetail) return <NotFound />

  const note = getNoteDetail.toJSON();

  if (note.visibility === "hidden") return <NotFound />
  if (note.visibility === "private" && !getUser) return <NotFound />

  return <NoteDetail data={note} />;
}