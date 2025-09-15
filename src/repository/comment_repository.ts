import { Note, User, Comment } from "@/models";
import AuthRepository from "./auth_repository";

class CommentRepository {
  protected AUTH_REPO: AuthRepository;

  constructor() {
    this.AUTH_REPO = new AuthRepository();
  }

  async storeComment(data: {noteId: number, comment: string}): Promise<Note | null> {
    try {
      const note = await Note.findByPk(data.noteId);
      if (note === null) return null;

      const getUser = await this.AUTH_REPO.getUser();
      if (!getUser) return null;

      const user = getUser;

      const comment = await Comment.create({
        userId: user.id,
        comment: data.comment
      });

      await note.addComment(comment);

      return note;
    } catch (error) {
      console.log("storeComment", error);
      return null;
    }
  }
}

export default CommentRepository;