import { Note, User, Comment } from "@/models";
import AuthRepository from "./auth_repository";

type globalNotes = {
  notes: Note[];
  count: number;
  page: number;
  size: number;
  totalPages: number;
}

type paramGlobalNotes = {
  page: number;
  size: number;
}

class NoteRepository {
  protected AUTH_REPO: AuthRepository;

  constructor() {
    this.AUTH_REPO = new AuthRepository();
  }

  async getPublicNotes(data: paramGlobalNotes): Promise<globalNotes | null> {
    try {
      const offset = (data.page - 1) * data.size;

      const {rows: notes, count} = await Note.findAndCountAll({
        where: {visibility: "public"},
        order: [
          ["id", "DESC"]
        ],
        limit: data.size,
        offset: offset
      });

      return {
        notes,
        count,
        page: data.page,
        size: data.size,
        totalPages: Math.ceil(count / data.size)
      };
    } catch (error) {
      console.log("getPublicNotes", error);
      return null;
    }
  }

  async getNotes(): Promise<Note[] | null> {
    try {
      const getUser = await this.AUTH_REPO.getUser();
      if (!getUser) return null;

      const user = getUser;

      const notes = await Note.findAll({
        where: {userId: user.id},
        include: {
          model: Comment,
          as: "comments",
          include: [
            {
              model: User,
              as: "user",
              attributes: ["name", "email"]
            }
          ]
        },
        order: [
          ["id", "DESC"]
        ]
      });

      return notes;
    } catch (error) {
      console.log("getNotes", error);
      return null;
    }
  }

  async getNoteDetail(data: {noteId: number}): Promise<Note | null> {
    try {
      const note = await Note.findByPk(data.noteId, {
        include: {
          model: Comment,
          as: "comments",
          include: [
            {
              model: User,
              as: "user",
              attributes: ["name", "email"]
            }
          ]
        },
        order: [
          [{model: Comment, as: "comments"}, "id", "DESC"]
        ]
      });

      return note;
    } catch (error) {
      console.log("getNoteDetail", error);
      return null
    }
  }

  async storeNote(data: storeNote): Promise<Note | null> {
    try {
      const getUser = await this.AUTH_REPO.getUser();
      if (!getUser) return null;

      const user = getUser;

      const create = await Note.create({
        userId: user.id,
        title: data.title.trim(),
        description: data.description,
        visibility: data.visibility
      });

      return create;
    } catch (error) {
      console.log("storeNote", error);
      return null;
    }
  }
}

export default NoteRepository;