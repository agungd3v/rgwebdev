import sequelize from "@/database/sequelize";
import {
  associate,
  User,
  Note,
  Comment,
  NoteComment
} from "./associations";

associate();

export {
  sequelize,
  User,
  Note,
  Comment,
  NoteComment
}