const bookController = require("../controllers");

const routes = [
  {
    method: "POST",
    path: "/books",
    handler: bookController.createBook,
  },
  {
    method: "GET",
    path: "/books",
    handler: bookController.getBooksHandler,
  },
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: bookController.getBookById,
  },
  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: bookController.updateBook,
  },
  {
    method: "DELETE",
    path: "/books/{bookId}",
    handler: bookController.deleteBook,
  },
];

module.exports = routes;
