const {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} = require("./book/book.controllers");

const { getBooksHandler } = require("./book/queryparams.controller");

module.exports = {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  getBooksHandler,
};
