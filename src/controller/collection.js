const { User, Book, Collection } = require("../../models");

// function to get all literature that add by user to their collection
exports.getMyCollections = async (req, res) => {
  const { id } = req.user;
  try {
    // get 1 user object (author)
    const user = await User.findOne({
      where: {
        id,
      },
    });
    const myCollection = await user.getCollected();
    res.send({
      message: "Data has been loaded successfully",
      data: {
        collection: myCollection,
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

// funtion add new Literature data
exports.addCollection = async (req, res) => {
  const { id } = req.user;
  const { id_book } = req.params;
  try {
    // get 1 user object
    const user = await User.findOne({
      where: {
        id,
      },
    });

    // find book data
    const bookData = await Book.findOne({
      where: {
        id: id_book,
      },
    });

    const isExist = await Collection.findOne({
      where: {
        userId: id,
        bookId: id_book,
      },
    });

    if (!isExist) {
      await user.addCollected(bookData);

      res.send({
        message: "Book has been added to your collection",
        data: {
          book: bookData,
        },
      });
    } else {
      res.status(403).send({
        error: {
          message: "Data already exist",
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
