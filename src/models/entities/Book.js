const { DataTypes } = require("sequelize");
const { sequelize } = require("../../db");

const Book = sequelize.define(
  "Book",
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publisher: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pageCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    readPage: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    finished: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    reading: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    insertedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Book;
