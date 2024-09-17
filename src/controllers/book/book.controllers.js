const { nanoid } = require("nanoid");
const Book = require("../../models/entities/Book");

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

  try {
    const book = await Book.create({
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
    });

    return h
      .response({
        status: "success",
        message: "Buku berhasil ditambahkan",
        data: {
          bookId: book.id,
        },
      })
      .code(201);
  } catch (error) {
    console.error(error);
    return h
      .response({
        status: "fail",
        message: "Gagal menambahkan buku",
      })
      .code(500);
  }
};

const getBooks = async (request, h) => {
  try {
    const books = await Book.findAll({
      attributes: ["id", "name", "publisher"],
    });

    return h
      .response({
        status: "success",
        data: {
          books,
        },
      })
      .code(200);
  } catch (error) {
    console.error(error);
    return h
      .response({
        status: "fail",
        message: "Gagal mendapatkan buku",
      })
      .code(500);
  }
};

const getBookById = async (request, h) => {
  const { bookId } = request.params;

  try {
    const book = await Book.findOne({
      where: { id: bookId },
    });

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
  } catch (error) {
    console.error(error);
    return h
      .response({
        status: "fail",
        message: "Gagal mendapatkan buku",
      })
      .code(500);
  }
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

  try {
    const [updated] = await Book.update(
      {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        finished: readPage === pageCount,
        updatedAt: new Date().toISOString(),
      },
      {
        where: { id: bookId },
      }
    );

    if (updated === 0) {
      return h
        .response({
          status: "fail",
          message: "Gagal memperbarui buku. Id tidak ditemukan",
        })
        .code(404);
    }

    return h
      .response({
        status: "success",
        message: "Buku berhasil diperbarui",
      })
      .code(200);
  } catch (error) {
    console.error(error);
    return h
      .response({
        status: "fail",
        message: "Gagal memperbarui buku",
      })
      .code(500);
  }
};

const deleteBook = async (request, h) => {
  const { bookId } = request.params;

  try {
    const deleted = await Book.destroy({
      where: { id: bookId },
    });

    if (deleted === 0) {
      return h
        .response({
          status: "fail",
          message: "Buku gagal dihapus. Id tidak ditemukan",
        })
        .code(404);
    }

    return h
      .response({
        status: "success",
        message: "Buku berhasil dihapus",
      })
      .code(200);
  } catch (error) {
    console.error(error);
    return h
      .response({
        status: "fail",
        message: "Gagal menghapus buku",
      })
      .code(500);
  }
};

module.exports = {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
};
