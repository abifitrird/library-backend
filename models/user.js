"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // each user can belongs to many books
      User.belongsToMany(models.Book, {
        as: "collected",
        through: {
          model: "Collection",
          as: "collection",
        },
      });
      // each user can become the author of many books
      User.belongsToMany(models.Book, {
        as: "books",
        through: {
          model: "AuthorBook",
          as: "info",
        },
      });
    }
  }
  User.init(
    {
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      gender: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      photo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
