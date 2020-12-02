const { User } = require("../../models");

// function to get all book that created by user
exports.getMyBooks = async (req, res) => {
  const { id } = req.user;
  try {
    // get 1 user object (author)
    const user = await User.findOne({
      where: {
        id,
      },
    });
    const myLibrary = await user.getBooks();
    res.send({
      message: "Data has been loaded successfully",
      data: {
        creation: myLibrary,
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
