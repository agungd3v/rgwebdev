import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "@/database/sequelize";

interface NoteCommentAttributes {
  id: number;
  noteId: number;
  commentId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CommentInput extends Optional<NoteCommentAttributes, "id"> {}
export interface NoteOutput extends Required<NoteCommentAttributes> {}

class NoteComment extends Model<NoteCommentAttributes, CommentInput> implements NoteCommentAttributes {
  public id!: number;
  public noteId!: number;
  public commentId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

NoteComment.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  noteId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  commentId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {sequelize: sequelize, tableName: "note_comments", modelName: "NoteComment"});

export default NoteComment;
