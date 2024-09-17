const { nanoid } = require("nanoid");
const books = require("../../books");

const createBook = async (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  if (!name) {
    return h
      .response({
        status: "fail",
        message: "Gagal menambahkan buku. Mohon isi nama buku",
      })
      .code(400);
  }

  if (readPage > pageCount) {
    return h
      .response({
        status: "fail",
        message:
          "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
      })
      .code(400);
  }

  const id = nanoid();
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = readPage === pageCount;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  return h
    .response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
    })
    .code(201);
};

const getBooks = async (request, h) => {
  const bookList = books.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));

  return h
    .response({
      status: "success",
      data: {
        books: bookList,
      },
    })
    .code(200);
};

const getBookById = async (request, h) => {
  const { bookId } = request.params;
  const book = books.find((b) => b.id === bookId);

  if (!book) {
    return h
      .response({
        status: "fail",
        message: "Buku tidak ditemukan",
      })
      .code(404);
  }

  return h
    .response({
      status: "success",
      data: {
        book,
      },
    })
    .code(200);
};

const updateBook = async (request, h) => {
  const { bookId } = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  if (!name) {
    return h
      .response({
        status: "fail",
        message: "Gagal memperbarui buku. Mohon isi nama buku",
      })
      .code(400);
  }

  if (readPage > pageCount) {
    return h
      .response({
        status: "fail",
        message:
          "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
      })
      .code(400);
  }

  const index = books.findIndex((book) => book.id === bookId);

  if (index === -1) {
    return h
      .response({
        status: "fail",
        message: "Gagal memperbarui buku. Id tidak ditemukan",
      })
      .code(404);
  }

  const updatedAt = new Date().toISOString();
  books[index] = {
    ...books[index],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished: readPage === pageCount,
    updatedAt,
  };

  return h
    .response({
      status: "success",
      message: "Buku berhasil diperbarui",
    })
    .code(200);
};

const deleteBook = async (request, h) => {
  const { bookId } = request.params;
  const index = books.findIndex((book) => book.id === bookId);

  if (index === -1) {
    return h
      .response({
        status: "fail",
        message: "Buku gagal dihapus. Id tidak ditemukan",
      })
      .code(404);
  }

  books.splice(index, 1);

  return h
    .response({
      status: "success",
      message: "Buku berhasil dihapus",
    })
    .code(200);
};

module.exports = {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
};
