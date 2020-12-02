const { Category } = require("../../models");

// function to get all data from categories table
exports.getCategories = async (req, res) => {
  try {
    const categoriesData = await Category.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.send({
      message: "Categories has been loaded",
      data: {
        categories: categoriesData,
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

// function to get specific data from categories table
exports.getOneCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const detailCategory = await Category.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.send({
      message: "Your request is ready",
      data: {
        category: detailCategory,
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

// function to add data to categories table
exports.createCategory = async (req, res) => {
  try {
    const categoryCreated = await Category.create(req.body);
    res.send({
      message: "New category has been created successfully",
      data: {
        category: categoryCreated,
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

// function to edit a category
exports.editCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const dataCategory = await Category.findOne({
      where: {
        id,
      },
    });
    if (dataCategory) {
      await Category.update(
        {
          name: name,
        },
        {
          where: {
            id,
          },
        }
      );
      const editedCategory = await Category.findOne({
        where: {
          id,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      res.send({
        message: "A category has been edited successfully",
        data: {
          category: editedCategory,
        },
      });
    } else {
      res.status(404).send({
        error: {
          message: "Category Not Found",
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

// function to delete a category
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const dataCategory = await Category.findOne({
      where: {
        id,
      },
    });

    if (dataCategory) {
      const deletedCategory = await Category.destroy({
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
