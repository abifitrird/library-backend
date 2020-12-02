"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // any literature can belongs to many users
      Book.belongsToMany(models.User, {
        as: "users",
        through: {
          model: "Collection",
          as: "collection",
        },
      });
      // each book can belong to only one category
      Book.belongsTo(models.Category, {
        as: "category",
        foreignKey: {
          name: "categoryId",
        },
      });

      // each book can belong to many authors
      Book.belongsToMany(models.User, {
        as: "authors",
        through: {
          model: models.AuthorBook,
          as: "info",
        },
      });
    }
  }
  Book.init(
    {
      title: DataTypes.STRING,
      publication: DataTypes.DATEONLY,
      categoryId: DataTypes.INTEGER,
      pages: DataTypes.INTEGER,
      ISBN: DataTypes.STRING,
      aboutBook: DataTypes.TEXT,
      file: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Book",
    }
  );
  return Book;
};
