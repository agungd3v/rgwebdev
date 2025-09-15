import { Model, DataTypes, Optional, HasManyAddAssociationMixin } from "sequelize";
import sequelize from "@/database/sequelize";
import Comment from "./comment_model";

interface NoteAttributes {
  id: number;
  userId: number;
  title: string;
  description: string;
  visibility: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface NoteInput extends Optional<NoteAttributes, "id"> {}
export interface NoteOutput extends Required<NoteAttributes> {}

class Note extends Model<NoteAttributes, NoteInput> implements NoteAttributes {
  public id!: number;
  public userId!: number;
  public title!: string;
  public description!: string;
  public visibility!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  declare addComment: HasManyAddAssociationMixin<Comment, number>;
  declare getComments: () => Promise<Comment[]>;
}

Note.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  visibility: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {sequelize: sequelize, tableName: "notes", modelName: "Note"});

export default Note;
