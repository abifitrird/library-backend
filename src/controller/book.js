const { Book, Category, User, AuthorBook } = require("../../models");

// get all book data
exports.getBooks = async (req, res) => {
  try {
    const bookData = await Book.findAll({
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["id", "name"],
        },
        {
          model: User,
          as: "authors",
          through: {
            model: AuthorBook,
            as: "info",
            attributes: {
              exclude: [
                "createdAt",
                "updatedAt",
                "bookId",
                "userId",
                "BookId",
                "UserId",
              ],
            },
          },
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "CategoryId", "categoryId"],
      },
    });
    res.send({
      message: "Your data has been loaded successfully",
      data: {
        books: bookData,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: {
        message: "SERVER ERROR",
      },
    });
  }
};

exports.getFilteredBook = async (req, res) => {
  try {
    const { id } = req.params;
    const filteredBook = await Book.findAll({
      where: {
        categoryId: id,
      },
    });

    res.send({
      message: "Your request is ready",
      data: {
        books: filteredBook,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: {
        message: "SERVER ERROR",
      },
    });
  }
};

// function to get specific data from books table
exports.getOneBook = async (req, res) => {
  try {
    const { id } = req.params;
    const detailBook = await Book.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["id", "name"],
        },
        {
          model: User,
          as: "authors",
          through: {
            model: AuthorBook,
            as: "info",
            attributes: {
              exclude: [
                "createdAt",
                "updatedAt",
                "bookId",
                "userId",
                "BookId",
                "UserId",
              ],
            },
          },
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "CategoryId", "categoryId"],
      },
    });

    res.send({
      message: "Your request is ready",
      data: {
        book: detailBook,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: {
        message: "SERVER ERROR",
      },
    });
  }
};

// function to add data to books table
// user add book
exports.createBook = async (req, res) => {
  const { id } = req.user;
  try {
    const {
      title,
      publication,
      categoryId,
      pages,
      ISBN,
      aboutBook,
      status,
    } = req.body;
    const file = req.files["file"][0].filename;

    // get 1 user object (author)
    const user = await User.findOne({
      where: {
        id,
      },
    });

    // create Book data
    const bookCreated = await Book.create({
      title,
      publication,
      categoryId,
      pages,
      ISBN,
      aboutBook,
      file,
      status,
    });

    // add new book with all data that have been stored in bookCreated
    await user.addBook(bookCreated);

    res.send({
      message: "New book entry has been created successfully",
      data: {
        book: bookCreated,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: {
        message: "SERVER ERROR",
      },
    });
  }
};

// function to edit a book
exports.editBook = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    // check existence
    const dataBook = await Book.findOne({
      where: {
        id,
      },
    });
    // if data exist
    if (dataBook) {
      // update data
      await Book.update(
        {
          title: body.title,
          publication: body.publication,
          categoryId: body.categoryId,
          pages: body.pages,
          ISBN: body.ISBN,
          aboutBook: body.aboutBook,
          file: body.file,
          status: body.status,
        },
        {
          where: {
            id,
          },
        }
      );
      // get the new data, input to a temporary variable
      const editedBook = await Book.findOne({
        where: {
          id,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      // send response
      res.send({
        message: "A book has been edited successfully",
        data: {
          book: editedBook,
        },
      });
    }

    // if data isn't exist
    else {
      res.status(404).send({
        error: {
          message: "Book Not Found",
        },
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: {
        message: "SERVER ERROR",
      },
    });
  }
};

// function to delete a book
exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const dataBook = await Book.findOne({
      where: {
        id,
      },
    });
    if (dataBook) {
      const deletedBook = await Book.destroy({
        where: {
          id,
        },
      });
      res.send({
        message: `Data with id=${id} has been deleted`,
        data: {
          id: id,
        },
      });
    } else {
      res.status(400).send({
        error: {
          message: `There is no data with id id=${id}`,
        },
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: {
        message: "SERVER ERROR",
      },
    });
  }
};
