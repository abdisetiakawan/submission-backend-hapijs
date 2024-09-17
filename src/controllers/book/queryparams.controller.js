const books = require("../../books");

const getBooksHandler = async (request, h) => {
  try {
    const { name, reading, finished } = request.query;

    let filteredBooks = books;

    if (name) {
      filteredBooks = filteredBooks.filter((book) =>
        book.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    if (reading !== undefined) {
      filteredBooks = filteredBooks.filter(
        (book) => book.reading === (reading === "1")
      );
    }

    if (finished !== undefined) {
      filteredBooks = filteredBooks.filter(
        (book) => book.finished === (finished === "1")
      );
    }

    const bookList = filteredBooks.map((book) => ({
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
  } catch (error) {
    console.error("Error fetching books:", error.message);

    return h
      .response({
        status: "fail",
        message: "Gagal mendapatkan buku",
      })
      .code(500);
  }
};

module.exports = { getBooksHandler };
