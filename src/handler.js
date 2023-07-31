const { nanoid } = require('nanoid');
const books = require('./books');

const addBooksHandler = (request, h) => {
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

  const id = nanoid(16);
  const insertAt = new Date().toISOString();
  const updatedAt = insertAt;
  const finished = pageCount === readPage;

  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const newBooks = {
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
    insertAt,
    updatedAt,
  };

  books.push(newBooks);

  const isAdded = books.filter((book) => book.id === id).length > 0;

  if (isAdded) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getAllBooksHandler = (req, h) => {
  const { name: nameQuery, reading: readingQuery, finished: finishedQuery } = req.query;

  if (nameQuery !== undefined) {
    const filterBooksArray = books.filter((book) => {
      const bookName = book.name.toLowerCase();
      return bookName.includes(nameQuery.toLowerCase());
    });
    const formatedBooks = filterBooksArray.map((book) => {
      const { id, name, publisher } = book;
      return { id, name, publisher };
    });

    const response = h.response({
      status: 'success',
      data: {
        books: formatedBooks,
      },
    });
    return response;
  }

  if (readingQuery !== undefined) {
    if (readingQuery === '1') {
      const filterBooksArray = books.filter((book) => book.reading);
      const formatedBooks = filterBooksArray.map((book) => {
        const { id, name, publisher } = book;
        return { id, name, publisher };
      });
      const response = h.response({
        status: 'success',
        data: {
          formatedBooks,
        },
      });
      return response;
    }
    if (readingQuery === 0) {
      const filterBooksArray = books.filter((book) => book.reading);
      const formatedBooks = filterBooksArray.map((book) => {
        const { id, name, publisher } = book;
        return { id, name, publisher };
      });
      const response = h.response({
        status: 'success',
        data: {
          formatedBooks,
        },
      });
      return response;
    }
  }
  if (finishedQuery !== undefined) {
    if (finishedQuery === '1') {
      const filterBooksArray = books.filter((book) => book.reading);
      const formatedBooks = filterBooksArray.map((book) => {
        const { id, name, publisher } = book;
        return { id, name, publisher };
      });
      const response = h.response({
        status: 'success',
        data: {
          formatedBooks,
        },
      });
      return response;
    }
    if (readingQuery === 0) {
      const filterBooksArray = books.filter((book) => book.reading);
      const formatedBooks = filterBooksArray.map((book) => {
        const { id, name, publisher } = book;
        return { id, name, publisher };
      });
      const response = h.response({
        status: 'success',
        data: {
          formatedBooks,
        },
      });
      return response;
    }
  }
  const formatedBooks = books.map((book) => {
    const { id, name, publisher } = book;
    return { id, name, publisher };
  });
  const response = h.response({
    status: 'success',
    data: {
      formatedBooks,
    },
  });
  return response;
};

const getBooksByIdHandler = (req, h) => {
  const { bookId } = req.params;
  const thisBook = books.filter((book) => book.id === bookId)[0];

  if (thisBook === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
  }

  const response = h.response({
    status: 'success',
    data: {
      books:
        thisBook,
    },
  });
  response.code(200);
  return response;
};
const editBooksByIdHandler = (req, h) => {
  const { bookId } = req.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.payload;

  const updatedAt = new Date().toISOString();

  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }
  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
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
      updatedAt,
    };
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. id tidak ditemukan',
  });
  response.code(200);
  return response;
};
const deleteBooksByIdHandler = (req, h) => {
  const { bookId } = req.params;

  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'succes',
      massage: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'succes',
    massage: 'Buku gagal dihapus. ia tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addBooksHandler,
  getAllBooksHandler,
  getBooksByIdHandler,
  editBooksByIdHandler,
  deleteBooksByIdHandl