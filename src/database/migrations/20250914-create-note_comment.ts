import { QueryInterface, DataTypes } from "sequelize";

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable("note_comments", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      noteId: {
        type: DataTypes.INTEGER,
        references: {
          model: "notes",
          key: "id",
        },
        onDelete: "CASCADE"
      },
      commentId: {
        type: DataTypes.INTEGER,
        references: {
          model: "comments",
          key: "id",
        },
        onDelete: "CASCADE"
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable("note_comments");
  }
}
