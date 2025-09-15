import User from "./user_model";
import Note from "./note_model";
import Comment from "./comment_model";
import NoteComment from "./note_comment_model";

export const associate = () => {
  User.hasMany(Note, {foreignKey: "userId", as: "notes"});
  Note.belongsTo(User, {foreignKey: "userId", as: "user"});

  User.hasMany(Comment, {foreignKey: "userId", as: "comments"});
  Comment.belongsTo(User, {foreignKey: "userId", as: "user"});

  Note.belongsToMany(Comment, {through: NoteComment, foreignKey: "noteId", as: "comments"});
  Comment.belongsToMany(Note, {through: NoteComment, foreignKey: "commentId", as: "notes"});
}

export {
  User,
  Note,
  Comment,
  NoteComment
}