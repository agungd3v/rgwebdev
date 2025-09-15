import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "@/database/sequelize";

interface CommentAttributes {
  id: number;
  userId: number;
  comment: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CommentInput extends Optional<CommentAttributes, "id"> {}
export interface CommentOutput extends Required<CommentAttributes> {}

class Comment extends Model<CommentAttributes, CommentInput> implements CommentAttributes {
  public id!: number;
  public userId!: number;
  public comment!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Comment.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {sequelize: sequelize, tableName: "comments", modelName: "Comment"});

export default Comment;
