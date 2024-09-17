const { Op } = require("sequelize");
const Book = require("../../models/entities/Book");

const getBooksHandler = async (request, h) => {
  try {
    const { name, reading, finished } = request.query;

    const queryOptions = {};

    if (name) {
      queryOptions.name = {
        [Op.like]: `%${name}%`,
      };
    }

    if (reading !== undefined) {
      queryOptions.reading = reading === "1";
    }

    if (finished !== undefined) {
      queryOptions.finished = finished === "1";
    }

    const books = await Book.findAll({
      attributes: ["id", "name", "publisher"],
      where: queryOptions,
    });

    if (!Array.isArray(books)) {
      throw new Error("Unexpected response format from database");
    }

    return h
      .response({
        status: "success",
        data: {
          books,
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
